from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_app, db, bcrypt 
from models import User, Doctor, Appointment, Patient, SecurePatientBillingView, Administrator, Bill # Import necessary models
from sqlalchemy.exc import IntegrityError
from datetime import datetime, date, time
from sqlalchemy import select, text 
import os

# --- INITIALIZATION ---
app = Flask(__name__)
CORS(app, supports_credentials=True)
init_app(app) 

# --- USER ROUTES (Login/Register) ---

@app.route("/register", methods=["POST"])
def register():
    """
    Handles user registration and creates corresponding role-specific entry (Patient/Doctor).
    """
    data = request.get_json()

    required_fields = ["name", "email", "password", "role"]
    if not all(data.get(field) for field in required_fields):
        return jsonify({"error": "Missing required fields (name, email, password, role)"}), 400

    email = data.get("email")
    role = data.get("role", "patient")

    # Duplicate check
    if db.session.execute(select(User).filter_by(email=email)).scalar_one_or_none():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        name=data.get("name"),
        email=email,
        role=role,
        dob=datetime.strptime(data.get("dob"), '%Y-%m-%d').date() if data.get("dob") else None,
        address=data.get("address"),
        emergency=data.get("emergency"),
        license=data.get("license"),
        specialization=data.get("specialization"),
        hospital=data.get("hospital")
    )

    new_user.set_password(data.get("password")) 
    
    try:
        db.session.add(new_user)
        db.session.flush() # Get the new_user.id before commit

        # Create role-specific entry (1:1 relationship with User)
        if role == 'patient':
            patient_entry = Patient(patient_id=new_user.id)
            db.session.add(patient_entry)
        elif role == 'doctor':
            doctor_entry = Doctor(doctor_id=new_user.id)
            db.session.add(doctor_entry)

        db.session.commit() # Final commit for User and Role entry
        
        return jsonify({"message": f"{role.capitalize()} registered successfully!"}), 201
    except Exception as e:
        db.session.rollback()
        print(f"Registration error: {e}")
        return jsonify({"error": "Registration failed due to internal database error."}), 500


@app.route("/login", methods=["POST"])
def login():
    """Handles user login, verifies password hash, and returns role for RBAC."""
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = db.session.execute(select(User).filter_by(email=email)).scalar_one_or_none()
    
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "user_id": user.id,
        "username": user.name,
        "role": user.role # CRITICAL for Frontend RBAC
    }), 200


# ----------------------------------------------------------------------
# 1. ACID TRANSACTION IMPLEMENTATION (The Rollback Feature)
# ----------------------------------------------------------------------
@app.route('/api/appointments', methods=['POST'])
def book_appointment():
    """
    IMPLEMENTATION OF ACID TRANSACTION: Guarantees Atomicity and Consistency.
    Relies on the PostgreSQL UNIQUE constraint to trigger a database ROLLBACK on double booking.
    """
    data = request.json
    
    required_fields = ['patient_id', 'doctor_id', 'appointment_date', 'appointment_time']
    if not all(data.get(field) for field in required_fields):
        return jsonify({"error": "Missing required fields (patient_id, doctor_id, date, time)."}), 400

    try:
        appt_date = datetime.strptime(data['appointment_date'], '%Y-%m-%d').date()
        appt_time = datetime.strptime(data['appointment_time'], '%H:%M').time()
        
        # --- ACID Transaction Start ---
        new_appt = Appointment(
            patient_id=data['patient_id'],
            doctor_id=data['doctor_id'],
            appointment_date=appt_date,
            appointment_time=appt_time,
            status="Confirmed"
        )
        
        # 1. Add to session (starts the database write operation)
        db.session.add(new_appt)
        
        # 2. Successful Commit: If the UNIQUE constraint in PostgreSQL is NOT violated.
        db.session.commit()
        
        return jsonify({
            "message": "Appointment booked successfully (COMMIT successful).",
            "appointment_id": new_appt.appointment_id
        }), 201

    except IntegrityError:
        # 3. Rollback: If the UNIQUE constraint is violated (double booking)
        db.session.rollback()
        print("Transaction Rollback: IntegrityError (Double Booking attempt Detected.)")
        return jsonify({
            "error": "Failed to book: Slot already reserved. (Transaction ROLLED BACK)"
        }, 409)

    except Exception as e:
        # 4. Generic Error Handling and Rollback
        db.session.rollback()
        print(f"Transaction failed due to internal error: {e}")
        return jsonify({"error": "Appointment failed due to internal error."}), 500
    # --- ACID Transaction End ---

# ----------------------------------------------------------------------
# 2. COMPLEX QUERY IMPLEMENTATION (The Multi-Table Join)
# ----------------------------------------------------------------------
@app.route('/api/doctor/schedule/<int:doctor_id>', methods=['GET'])
def get_doctor_schedule(doctor_id):
    """
    IMPLEMENTATION OF COMPLEX QUERY: Fetches a doctor's schedule using multi-table JOINs.
    """
    
    # 1. Complex Query using SQLAlchemy JOINs (Equivalent to raw SQL Join)
    roster_query = db.session.execute(
        select(
            Appointment.appointment_time, 
            Appointment.status,
            User.name.label('patient_name'), 
            User.emergency.label('patient_phone') 
        )
        .join(Patient, Appointment.patient_id == Patient.patient_id) 
        .join(User, Patient.patient_id == User.id)
        .where(Appointment.doctor_id == doctor_id)
        .order_by(Appointment.appointment_time.asc())
    ).all()
    
    # 2. Format the results
    roster = []
    for row in roster_query:
        roster.append({
            "time": str(row.appointment_time),
            "status": row.status,
            "patient_name": row.patient_name,
            "patient_phone": row.patient_phone
        })

    # 3. Retrieve doctor's name for context 
    doctor_user = db.session.execute(
        select(User).where(User.id == doctor_id)
    ).scalar_one_or_none()

    if not doctor_user or doctor_user.role != 'doctor':
        return jsonify({"message": "Doctor not found or invalid role."}), 404

    return jsonify({
        "doctor_name": doctor_user.name,
        "roster": roster
    }), 200

# ----------------------------------------------------------------------
# 3. DATABASE VIEW IMPLEMENTATION (The Security Feature)
# ----------------------------------------------------------------------
@app.route('/api/admin/billing-overview', methods=['GET'])
def get_billing_overview():
    """
    Fetches secure billing data using the V_Secure_Patient_Billing VIEW.
    Demonstrates security by simplifying data for the Administrator role.
    """
    
    # Query the View directly using the imported View Model
    view_results = db.session.execute(
        select(SecurePatientBillingView)
    ).scalars().all()

    # Convert results to a list of dictionaries for JSON output
    billing_data = [{
        'user_id': item.user_id,
        'patient_name': item.patient_name,
        'bill_id': item.bill_id,
        'amount': str(item.amount), # Convert Decimal to string for JSON
        'status': item.status
    } for item in view_results]

    return jsonify({
        "message": "Secure billing overview retrieved.",
        "data": billing_data
    }), 200
    
@app.route('/')
def index():
    return "Welcome to the Smart HealthCare Backend API"


# =======================================================================
# NEW CODE BLOCKS FOR AUTOMATIC SETUP (Place at the end of app.py)
# =======================================================================

def setup_database():
    """
    Automatically inserts sample data and creates the PostgreSQL View.
    Runs only if the User table is empty.
    """
    from models import Administrator, Bill, Appointment
    from sqlalchemy import text
    
    # 1. Check if database is already populated
    if db.session.execute(select(User)).fetchone() is not None:
        print("Database already contains user data. Skipping initial insert.")
        return

    print("Inserting sample data and creating View...")
    
    # --- Define Sample Users ---
    # Password for all: 'testpass'
    users_data = [
        {'id': 100, 'role': 'admin', 'name': 'Alex Administrator', 'email': 'admin@shms.com'},
        {'id': 201, 'role': 'doctor', 'name': 'Dr. Smith', 'email': 'dr.smith@shms.com', 
         'dob': date(1978, 5, 20), 'emergency': '9999999999', 'specialization': 'Cardiology'},
        {'id': 301, 'role': 'patient', 'name': 'Priya Patient', 'email': 'priya@shms.com', 
         'dob': date(1995, 10, 1), 'emergency': '8888888888'},
        {'id': 302, 'role': 'patient', 'name': 'Tom Test', 'email': 'tom@shms.com', 
         'dob': date(2000, 3, 12), 'emergency': '7777777777'},
    ]
    
    # 2. Insert Users and Role-Specific Entries
    for data in users_data:
        # Create User instance
        new_user = User(
            id=data['id'],
            role=data['role'],
            name=data['name'],
            email=data['email'],
            dob=data.get('dob'),
            emergency=data.get('emergency'),
            specialization=data.get('specialization')
        )
        new_user.set_password('testpass') 
        db.session.add(new_user)

        # Create role-specific instance
        if data['role'] == 'patient':
            db.session.add(Patient(patient_id=data['id']))
        elif data['role'] == 'doctor':
            db.session.add(Doctor(doctor_id=data['id']))
        elif data['role'] == 'admin':
            db.session.add(Administrator(admin_id=data['id'])) 

    # 3. Insert Appointments (for Complex Query/ACID Test Setup)
    db.session.add(Appointment(patient_id=301, doctor_id=201, appointment_date=date(2025, 11, 16), appointment_time=time(10, 0, 0), status='Confirmed'))
    db.session.add(Appointment(patient_id=302, doctor_id=201, appointment_date=date(2025, 11, 16), appointment_time=time(11, 0, 0), status='Confirmed'))

    # 4. Insert Bill (for View Test Setup)
    db.session.add(Bill(patient_id=301, amount=150.00, status='Pending', date_issued=date.today()))

    try:
        db.session.commit()
        print("Sample data successfully inserted.")
        
        # 5. Create the Database View (Raw SQL execution)
        view_sql = """
        CREATE OR REPLACE VIEW V_Secure_Patient_Billing AS
        SELECT
            U.id AS user_id,
            U.name AS patient_name,
            U.email,
            B.bill_id,
            B.amount,
            B.status,
            B.date_issued
        FROM
            "user" U
        JOIN
            bill B ON U.id = B.patient_id
        WHERE
            U.role = 'patient';
        """
        db.session.execute(text(view_sql))
        db.session.commit()
        print("Database View V_Secure_Patient_Billing created successfully.")
        
    except Exception as e:
        db.session.rollback()
        print(f"Error during data setup/view creation: {e}")
        print("Rolling back transaction. Check your schema/data types.")


# =======================================================================
# MODIFIED __main__ BLOCK (This block replaces your existing 'if __name__ == "__main__":' block)
# =======================================================================

if __name__ == "__main__":
    print("Starting Flask server...")
    
    # We create the application context before running the server
    with app.app_context():
        print("Attempting to create schema...")
        try:
            # This creates all 10 tables
            db.create_all() 
            print("Database schema successfully created/verified!")
            
            # --- AUTOMATIC DATA INSERTION CALL ---
            setup_database() 
            
        except Exception as e:
            print(f"Error during initial setup: {e}")
            
    # Now run the server
    app.run(debug=True)
from database import db, bcrypt
from sqlalchemy import UniqueConstraint, ForeignKey, Column, Integer, String, Date, Time, Numeric, Text
from sqlalchemy.orm import relationship
from datetime import datetime

# --- 1. USER Table (Base for Authentication and RBAC) ---
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True) 
    
    # Core Identity Fields (Synchronized)
    role = db.Column(db.String(20), nullable=False) 
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # General/Patient-specific
    dob = db.Column(db.Date)
    address = db.Column(db.String(255))
    emergency = db.Column(db.String(50)) 

    # Doctor-specific
    license = db.Column(db.String(50), unique=True, nullable=True) # Alternate Key (AK)
    specialization = db.Column(db.String(100))
    hospital = db.Column(db.String(100))

    # Relationships (for SQLAlchemy JOINs)
    patient_rel = relationship('Patient', backref='user_details', uselist=False, primaryjoin="User.id == Patient.patient_id")
    doctor_rel = relationship('Doctor', backref='user_details', uselist=False, primaryjoin="User.id == Doctor.doctor_id")
    admin_rel = relationship('Administrator', backref='user_details', uselist=False, primaryjoin="User.id == Administrator.admin_id")
    
    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

# --- 2. PATIENT Table (1:1 with User) ---
class Patient(db.Model):
    __tablename__ = 'patient'
    patient_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True) 
    
# --- 3. DOCTOR Table (1:1 with User) ---
class Doctor(db.Model):
    __tablename__ = 'doctor'
    doctor_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    
# --- 4. APPOINTMENT Table (ACID Transaction Focus) ---
class Appointment(db.Model):
    __tablename__ = 'appointment'
    appointment_id = db.Column(db.Integer, primary_key=True)
    
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    
    appointment_date = db.Column(db.Date, nullable=False)
    appointment_time = db.Column(db.Time, nullable=False)
    status = db.Column(db.String(20), default='Scheduled')

    # CRITICAL: Composite Alternate Key for ROLLBACK demo
    __table_args__ = (
        UniqueConstraint('doctor_id', 'appointment_date', 'appointment_time', name='_doctor_time_uc'),
    )

    patient = relationship('Patient', backref='appointments', foreign_keys=[patient_id])
    doctor = relationship('Doctor', backref='appointments', foreign_keys=[doctor_id])

# --- 5. ADMINISTRATOR Table (1:1 with User) ---
class Administrator(db.Model):
    __tablename__ = 'administrator'
    admin_id = db.Column(db.Integer, db.ForeignKey('user.id'), primary_key=True)
    department = db.Column(db.String(100))

# --- 6. SPECIALIZATION Table (Normalization Proof) ---
class Specialization(db.Model):
    __tablename__ = 'specialization'
    specialization_id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    # NOTE: You would typically link Doctor to Specialization here if Doctor didn't store it in the User table

# --- 7. DOCTOR SCHEDULE Table (Concurrency/Availability Focus) ---
class DoctorSchedule(db.Model):
    __tablename__ = 'doctor_schedule'
    schedule_id = db.Column(db.Integer, primary_key=True)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    day_of_week = db.Column(db.String(10), nullable=False)
    start_time = db.Column(db.Time, nullable=False)
    end_time = db.Column(db.Time, nullable=False)

    __table_args__ = (
        UniqueConstraint('doctor_id', 'day_of_week', 'start_time', 'end_time', name='_doctor_schedule_uc'),
    )

    doctor = relationship('Doctor', backref='schedules', foreign_keys=[doctor_id])

# --- 8. MEDICAL RECORD Table ---
class MedicalRecord(db.Model):
    __tablename__ = 'medical_record'
    record_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    doctor_id = db.Column(db.Integer, db.ForeignKey('doctor.doctor_id'), nullable=False)
    date_created = db.Column(db.DateTime, default=datetime.utcnow)
    diagnosis = db.Column(db.Text, nullable=False)
    notes = db.Column(db.Text)
    
    patient = relationship('Patient', backref='records', foreign_keys=[patient_id])
    doctor = relationship('Doctor', backref='records', foreign_keys=[doctor_id])

# --- 9. PRESCRIPTION Table (1:M with MedicalRecord) ---
class Prescription(db.Model):
    __tablename__ = 'prescription'
    prescription_id = db.Column(db.Integer, primary_key=True)
    record_id = db.Column(db.Integer, db.ForeignKey('medical_record.record_id'), nullable=False)
    medication_name = db.Column(db.String(150), nullable=False)
    dosage = db.Column(db.String(50))
    instructions = db.Column(db.Text)
    
    record = relationship('MedicalRecord', backref='prescriptions', foreign_keys=[record_id])

# --- 10. BILL Table (Required for View) ---
class Bill(db.Model):
    __tablename__ = 'bill'
    bill_id = db.Column(db.Integer, primary_key=True)
    patient_id = db.Column(db.Integer, db.ForeignKey('patient.patient_id'), nullable=False)
    amount = db.Column(db.Numeric(10, 2), nullable=False)
    date_issued = db.Column(db.Date, default=datetime.utcnow)
    status = db.Column(db.String(20), default='Pending')
    description = db.Column(db.String(255))

    patient = relationship('Patient', backref='bills', foreign_keys=[patient_id])

# --- 11. SECURE BILLING VIEW (Security Feature) ---
class SecurePatientBillingView(db.Model):
    """Maps to the V_Secure_Patient_Billing View in PostgreSQL."""
    __tablename__ = 'v_secure_patient_billing'
    __table_args__ = {'info': dict(is_view=True)}
    
    user_id = db.Column(db.Integer, primary_key=True) 
    bill_id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(120))
    email = db.Column(db.String(120))
    amount = db.Column(db.Numeric(10, 2))
    status = db.Column(db.String(20))
    date_issued = db.Column(db.Date)
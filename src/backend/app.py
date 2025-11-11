from flask import Flask, request, jsonify
from flask_cors import CORS
from database import init_app, db
from models import User

app = Flask(__name__)
CORS(app, supports_credentials=True)
init_app(app)


@app.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # Basic fields
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "patient")

    # Common validation
    if not name or not email or not password:
        return jsonify({"error": "Missing required fields"}), 400

    # Duplicate check
    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already exists"}), 400

    new_user = User(
        name=name,
        email=email,
        role=role,
        dob=data.get("dob"),
        address=data.get("address"),
        emergency=data.get("emergency"),
        license=data.get("license"),
        specialization=data.get("specialization"),
        hospital=data.get("hospital")
    )

    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": f"{role.capitalize()} registered successfully!"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if not user or not user.check_password(password):
        return jsonify({"error": "Invalid credentials"}), 401

    return jsonify({
        "message": "Login successful",
        "username": user.name,
        "role": user.role
    }), 200


if __name__ == "__main__":
    app.run(debug=True)

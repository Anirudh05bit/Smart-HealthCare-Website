from database import db, bcrypt

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    role = db.Column(db.String(20), nullable=False)  # doctor / patient
    name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)

    # Patient-specific
    dob = db.Column(db.String(20))
    address = db.Column(db.String(255))
    emergency = db.Column(db.String(50))

    # Doctor-specific
    license = db.Column(db.String(50))
    specialization = db.Column(db.String(100))
    hospital = db.Column(db.String(100))

    def set_password(self, password):
        self.password_hash = bcrypt.generate_password_hash(password).decode("utf-8")

    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)

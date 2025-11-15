from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import Flask
import os

db = SQLAlchemy()
bcrypt = Bcrypt()

def init_app(app):
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv(
        "DATABASE_URL", "postgresql://postgres:Sreejithm11@localhost:5110/shms_project_db"

    )
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    db.init_app(app)
    with app.app_context():
        db.create_all()
    bcrypt.init_app(app)

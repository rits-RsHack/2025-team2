from app import db
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash


class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    mail = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)

    posts = db.relationship('Post', back_populates='author', lazy=True)

    def __repr__(self):
        return f"<User(name='{self.name}', mail='{self.mail}')>"

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'mail': self.mail
        }

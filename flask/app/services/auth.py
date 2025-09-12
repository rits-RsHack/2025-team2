from sqlalchemy.orm import Session
from ..models.auth import User
from werkzeug.security import generate_password_hash, check_password_hash

class UserService:
    def __init__(self, session: Session):
        self.session = session

    def get_user_by_username(self, username: str):
        return self.session.query(User).filter_by(username=username).first()

    def create_user(self, username: str, password: str):
        hashed_password = generate_password_hash(password)
        new_user = User(username=username, password_hash=hashed_password)
        self.session.add(new_user)
        self.session.commit()
        return new_user
        
    def check_user_password(self, user: User, password: str):
        return check_password_hash(user.password_hash, password)
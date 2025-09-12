from sqlalchemy.orm import Session
from werkzeug.security import generate_password_hash, check_password_hash
from ..models.auth import User

class UserService:
    def __init__(self, session: Session):
        self.session = session

    def get_user_by_mail(self, mail: str):
        return self.session.query(User).filter_by(mail=mail).first()

    def create_user(self, name: str, mail: str, password: str):
        hashed_password = generate_password_hash(password)
        
        new_user = User(
            name=name, 
            mail=mail, 
            password_hash=hashed_password
        )
        
        self.session.add(new_user)
        self.session.commit()
        self.session.refresh(new_user)
        
        return new_user
        
    def check_user_password(self, user: User, password: str):
        return check_password_hash(user.password_hash, password)

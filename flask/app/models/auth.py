from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash

# SQLAlchemyのBaseクラスを定義
# このクラスを継承してモデルを作成します
Base = declarative_base()

class User(Base):
    __tablename__ = 'users'  # テーブル名を定義

    id = Column(Integer, primary_key=True)
    name = Column(String(50), nullable=False)
    mail = Column(String(100), unique=True, nullable=False)
    password_hash = Column(String(255), nullable=False)

    def __repr__(self):
        # オブジェクトを文字列で表現するためのメソッド
        return f"<User(name='{self.name}', mail='{self.mail}')>"



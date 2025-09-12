from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import sessionmaker, declarative_base
from app.models.auth import User
from app.models.posts import Post
import os

# データベース接続情報 (MySQL)
DATABASE_URL = os.environ.get('DATABASE_URL')
if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set.")

# データベースエンジンを作成
engine = create_engine(DATABASE_URL)

# ベースクラスを作成
Base = declarative_base()

# セッションを作成
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def get_db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

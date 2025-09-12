from sqlalchemy.orm import Session
from .database import Database
from app.models.posts import Post

# データベース接続情報 (db_url) を定義
DB_URL = "mysql+mysqlconnector://root:password@db:3306/studydb"
db_manager = Database(DB_URL)

def create_post(title: str, content: str, author_id: int, study_hours: int = 0, panorama_video: str = None):
    db = db_manager.get_session()
    try:
        new_post = Post(
            title=title,
            content=content,
            author_id=author_id,
            study_hours=study_hours,
            panorama_video=panorama_video
        )
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return new_post
    except Exception as e:
        db.rollback()
        raise e
    finally:
        db.close()

def get_all_posts():
    db = db_manager.get_session()
    try:
        posts = db.query(Post).all()
        return posts
    finally:
        db.close()
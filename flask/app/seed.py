# flask/seed.py
from app import create_app, db
from app.models.auth import User
from app.models.posts import Post

app = create_app()
with app.app_context():
    user = User(name="シードユーザー", mail="seed@example.com", password_hash="hashed_password")
    db.session.add(user)
    db.session.commit()

    post = Post(title="最初の投稿", content="これはseedデータです", author_id=user.id)
    db.session.add(post)
    db.session.commit()

from app import db
from app.models.posts import Post

def create_post(title, content, author_id, study_hours=0, panorama_video=None):
    new_post = Post(
        title=title,
        content=content,
        author_id=author_id,
        study_hours=study_hours,
        panorama_video=panorama_video
    )
    db.session.add(new_post)
    db.session.commit()
    return new_post


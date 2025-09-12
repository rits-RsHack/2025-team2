import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import text
from flask_cors import CORS

from tenacity import retry, stop_after_attempt, wait_fixed
from sqlalchemy import create_engine

database_url = os.environ.get('DATABASE_URL')

@retry(stop=stop_after_attempt(5), wait=wait_fixed(3))
def wait_for_db():
    engine = create_engine(database_url)
    with engine.connect() as conn:
        conn.execute(text("SELECT 1"))

wait_for_db()

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    CORS(app)
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise ValueError("DATABASE_URL environment variable is not set.")
    
    app.config['SQLALCHEMY_DATABASE_URI'] = database_url
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    
    db.init_app(app)
    
    with app.app_context():
        from app.models.auth import User
        from app.models.posts import Post
        db.create_all()
    
    # ブループリントの登録
    from app.routes.posts import posts_bp
    from app.routes.user import users_bp
    app.register_blueprint(posts_bp)
    app.register_blueprint(users_bp)
    
    @app.route('/')
    def health_check():
        try:
            with db.engine.connect() as connection:
                connection.execute(text('SELECT 1'))
            return jsonify({"status": "ok", "message": "Successfully connected to the database."}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": f"Database connection or query failed: {str(e)}"}), 500
    
    return app
import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

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
    
    # ブループリントの登録
    from app.routes import test_bp
    app.register_blueprint(test_bp)
    
    @app.route('/')
    def health_check():
        try:
            with db.engine.connect() as connection:
                connection.execute('SELECT 1')
            return jsonify({"status": "ok", "message": "Successfully connected to the database."}), 200
        except Exception as e:
            return jsonify({"status": "error", "message": f"Database connection or query failed: {str(e)}"}), 500
    
    return app
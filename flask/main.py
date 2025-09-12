import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

database_url = os.environ.get('DATABASE_URL')
if not database_url:
    raise ValueError("DATABASE_URL environment variable is not set.")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
CORS(app)
db = SQLAlchemy(app)

@app.route('/')
def health_database_check():
    try:
        with db.engine.connect() as connection:
            connection.execute('SELECT 1')
        return jsonify({"status": "ok", "message": "Successfully connected to the database."}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": f"Database connection or query failed: {str(e)}"}), 500

@app.route('/health')
def health_check():
    try:
        # 基本的なヘルスチェック
        health_status = {
            'status': 'healthy',
            'message': 'Application is running',
            'service': 'python-api'
        }

        
        return jsonify(health_status), 200

    except Exception as e:
        error_status = {
            'status': 'unhealthy',
            'message': 'Application health check failed',
            'error': str(e)
        }
        return jsonify(error_status), 503

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)

import os
from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

database_url = os.environ.get('DATABASE_URL')
if not database_url:
    raise ValueError("DATABASE_URL environment variable is not set.")

app.config['SQLALCHEMY_DATABASE_URI'] = database_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

@app.route('/')
def health_check():
    try:
        with db.engine.connect() as connection:
            connection.execute('SELECT 1')
        return jsonify({"status": "ok", "message": "Successfully connected to the database."}), 200
    except Exception as e:
        return jsonify({"status": "error", "message": f"Database connection or query failed: {str(e)}"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5050, debug=True)

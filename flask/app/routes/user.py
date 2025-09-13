from flask import Blueprint, request, jsonify
from ..services.auth import UserService
from ..models_and_db import SessionLocal
from ..models.auth import User

users_bp = Blueprint('users', __name__, url_prefix='/api/users')

@users_bp.route('/', methods=['POST'])
def create_user():
    data = request.get_json()
    name = data.get('name')
    mail = data.get('mail')
    password = data.get('password')

    if not mail or not name or not password:
        return jsonify({"error": "Name, mail, and password are required."}), 400

    session = SessionLocal()
    try:
        user_service = UserService(session)
        user = user_service.create_user(name,mail, password)
        return jsonify(user.to_dict()), 201
    except Exception as e:
        session.rollback()
        return jsonify({'message': f"Error creating user: {str(e)}"}), 500
    finally:
        session.close()

@users_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    name = data.get('name')
    password = data.get('password')

    if not name or not password:
        return jsonify({"message": "ユーザーネームとパスワードは必須です"}), 400

    session = SessionLocal()
    try:
        user_service = UserService(session)
        user = user_service.get_user_by_name(name)

        if user and user_service.check_user_password(user, password):
            return jsonify({"message": "ログイン成功", "user_id": user.id}), 200
        else:
            return jsonify({"message": "無効なユーザーネームまたはパスワード"}), 401
    finally:
        session.close()

User.to_dict = lambda self: {
    'id': self.id,
    'name': self.name,
    'mail': self.mail
}
from flask import Blueprint, request, jsonify
from services.auth import UserService
from services.database import Database


user = Blueprint('user', __name__)

@user.route('/login', methods=['POST'])
def login():
    # フロントエンドから送信されたデータを取得
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    with Database.get_session() as session:
        user_service = UserService(session)
        user = user_service.get_user_by_username(username)

        if user and user_service.check_user_password(user, password):
            # ログイン成功
            return jsonify({"message": "ログイン成功"}), 200
        else:
            # ログイン失敗
            return jsonify({"message": "無効なユーザー名またはパスワード"}), 401


    # ここに認証ロジックを記述
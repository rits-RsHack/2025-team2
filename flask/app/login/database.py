from werkzeug.security import generate_password_hash, check_password_hash

# ユーザーデータを模倣した辞書
# 実際はデータベースから取得します
users_data = {
    "user1": {
        "password": generate_password_hash("password123"), # パスワードはハッシュ化
        "name": "ユーザー1"
    }
}

class User:
    def __init__(self, user_id, name):
        self.id = user_id
        self.name = name

    def is_authenticated(self):
        return True

    def is_active(self):
        return True

    def is_anonymous(self):
        return False

    def get_id(self):
        return str(self.id)

def get_user(user_id):
    if user_id in users_data:
        return User(user_id, users_data[user_id]["name"])
    return None

def check_password(user_id, password):
    if user_id in users_data:
        return check_password_hash(users_data[user_id]["password"], password)
    return False
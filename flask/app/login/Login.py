from flask import Flask, render_template, request, redirect, url_for, flash
from flask_login import LoginManager, UserMixin, login_user, logout_user, login_required, current_user
from database import get_user, check_password

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key-here'  # セッション管理に必要な秘密鍵

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'  # ログインが必要なページにアクセスされたときにリダイレクトされるビュー

@login_manager.user_loader
def load_user(user_id):
    return get_user(user_id)

@app.route('/')
@login_required
def dashboard():
    return render_template('dashboard.html', user=current_user)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_id = request.form.get('user_id')
        password = request.form.get('password')

        if check_password(user_id, password):
            user = get_user(user_id)
            login_user(user)
            return redirect(url_for('dashboard'))
        else:
            flash('ユーザーIDまたはパスワードが間違っています。')
            return redirect(url_for('login'))
            
    return render_template('login.html')

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('login'))

if __name__ == '__main__':
    app.run(debug=True)
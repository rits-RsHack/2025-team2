# ベースイメージは軽量版
FROM python:3.11-slim

# 環境変数
ENV PYTHONDONTWRITEBYTECODE=1 
ENV    PYTHONUNBUFFERED=1

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係を先にコピーしてインストール（キャッシュ効率化）
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# アプリケーションコピー
COPY . .

# ポート公開
EXPOSE 5050

CMD ["python","main.py"]
FROM python:3.9-slim

# 作業ディレクトリを設定
WORKDIR /app

# 必要なシステムパッケージをインストール
RUN apt-get update && apt-get install -y ffmpeg && apt-get clean

# requirements.txt をコピーしてパッケージをインストール
COPY requirements.txt .
RUN pip install --no-cache-dir --upgrade -r requirements.txt

# アプリケーションコードをコピー
COPY ./app/ /app/

# アプリケーションを起動
CMD ["uvicorn", "main:app", "--reload", "--host", "0.0.0.0", "--port", "8001"]

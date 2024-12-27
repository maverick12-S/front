# ベースイメージ
FROM node:16

# 作業ディレクトリ
WORKDIR /app

# package.jsonをコピーして依存関係をインストール
COPY package*.json ./
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ビルド
RUN npm run build

# サーバーを起動
CMD ["npm", "start"]

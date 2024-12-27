# ベースイメージとしてNode.jsを使用
FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.json と package-lock.json をコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションコードをコピー
COPY . .

# ビルド（必要であればプロダクションビルド）
RUN npm run build

# ポート番号を公開
EXPOSE 3000

# サーバーを起動
CMD ["npm", "start"]:

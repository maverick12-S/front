import React, { useState } from "react";
import { getProfileApi, getAllProfileApi, deleteProfileApi } from "../api/apiData"; // 必要なAPIをインポート

const LevelTwo = () => {
  const [id, setId] = useState(""); // ID入力用
  const [deleteId, setDeleteId] = useState(""); // 削除用ID
  const [name, setName] = useState(""); // 名前の表示用
  const [age, setAge] = useState(""); // 年齢の表示用
  const [accounts, setAccounts] = useState([]); // すべてのアカウントデータ用
  const [isVisible, setIsVisible] = useState(false); // リストの表示状態
  const [message, setMessage] = useState(""); // メッセージ表示

  // 全プロフィールを検索
  const searchAllProfile = async () => {
    try {
      const profileAllData = await getAllProfileApi(); // API 呼び出し

      // オブジェクトを配列に変換
      const profilesArray = Object.values(profileAllData);

      setAccounts(profilesArray); // 配列を保存
      setIsVisible(true); // リストを表示
    } catch (error) {
      console.error("Error fetching all profiles:", error);
      setName("登録されたユーザデータの取得に失敗しました");
    }
  };

  // 単一プロフィールを検索
  const searchProfile = async (e) => {
    e.preventDefault();
    try {
      const profileData = await getProfileApi(id); // ID に基づく検索
      setName(profileData.name); // 名前を設定
      setAge(profileData.age); // 年齢を設定
    } catch (error) {
      console.error("Error fetching profile:", error);
      setName("入力されたIDのユーザは存在しません");
      setAge(""); // 年齢をリセット
    }
  };

  // プロフィールを削除
  const deleteProfile = async (e) => {
    e.preventDefault();
    try {
      const profileData = await deleteProfileApi(deleteId); // ID に基づいて削除
      setMessage(profileData.message); // メッセージを表示
      setDeleteId(""); // 削除フォームをリセット
      await searchAllProfile(); // アカウントリストを更新
    } catch (error) {
      console.error("Error deleting profile:", error);
      setMessage(error.message || "エラーが発生しました");
    }
  };

  return (
    <div>
      <h1>Level 2 Page</h1>
      <p>リソースサーバーのDBからRestApiを用いてデータ取得</p>

      {/* ID検索フォーム */}
      <form onSubmit={searchProfile}>
        <input
          type="text"
          placeholder="IDを入力"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">検索</button>
      </form>

      {/* 単一検索結果 */}
      <div>
        <p>名前: {name}</p>
        <p>年齢: {age}</p>
      </div>

      {/* 全プロフィール取得ボタン */}
      <button onClick={searchAllProfile}>Show Accounts</button>

      {/* 全プロフィールリスト */}
      {isVisible && (
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>
              <strong>ID:</strong> {account.id}, <strong>Name:</strong> {account.name},{" "}
              <strong>Age:</strong> {account.age}
            </li>
          ))}
        </ul>
      )}

      {/* プロフィール削除フォーム */}
      <form onSubmit={deleteProfile}>
        <input
          type="text"
          placeholder="削除するIDを入力"
          value={deleteId}
          onChange={(e) => setDeleteId(e.target.value)}
        />
        <button type="submit">削除</button>
      </form>

      {/* メッセージ表示 */}
      <div>
        <p>{message}</p>
      </div>
    </div>
  );
};

export default LevelTwo;

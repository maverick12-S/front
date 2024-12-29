import React, { useState } from "react";
import { getProfileApi, getAllProfileApi } from "../api/apiData"; // 必要なAPIをインポート

const LevelTwo = () => {
  const [id, setId] = useState(""); // ID入力用
  const [name, setName] = useState(""); // 名前の表示用
  const [age, setAge] = useState(""); // 年齢の表示用
  const [accounts, setAccounts] = useState([]); // すべてのアカウントデータ用
  const [isVisible, setIsVisible] = useState(false); // リストの表示状態

  // 全プロフィールを検索
  const serchAllProfile = async () => {
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
  const serchProfile = async (e) => {
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

  return (
    <div>
      <h1>Level 2 Page</h1>
      <p>リソースサーバーのDBからRestApiを用いてデータ取得</p>

      {/* ID検索フォーム */}
      <form onSubmit={serchProfile}>
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
      <button onClick={serchAllProfile}>Show Accounts</button>

      {/* 全プロフィールリスト */}
      {isVisible && (
        <ul>
          {accounts.map((account, index) => (
            <li key={index}>
              <strong>ID:</strong> {account.id}, <strong>Name:</strong> {account.name},{" "}
              <strong>Age:</strong> {account.age}, <strong>Valid:</strong> {account.valid ? "Yes" : "No"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LevelTwo;

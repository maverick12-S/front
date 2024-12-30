import React, { useState } from "react";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState(""); // ユーザー名
  const [password, setPassword] = useState(""); // パスワード
  const [errorMessage, setErrorMessage] = useState(""); // エラーメッセージ

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({username, password }), // Spring側のDTOに合わせる
      });

      if (!response.ok) {
        // サーバーからエラーメッセージを取得して表示
        const errorData = await response.json();
        throw new Error(errorData.message || "Invalid credentials");
      }

      const data = await response.json();
      localStorage.setItem("authToken", data.token); // トークンをローカルストレージに保存
      onLogin(data.token); // トークンを親コンポーネントで管理
    } catch (error) {
      setErrorMessage(error.message); // エラーを表示
    }
  };

  return (
    <div>
      <h1>Login Page</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // 状態を更新
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // 状態を更新
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
    </div>
  );
};

export default Login;

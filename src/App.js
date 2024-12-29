import React, { useEffect, useState } from "react";
import { getHelloMessage, formCallApi } from "./api/api";
import LevelTwo from "./lv2/LevelTwo";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LevelTwoAdd from "./lv2/LevelTwoAdd";

// LevelOneの定義
const LevelOne = ({ message, name, setName, handleSubmit, responseMessage }) => {
  return (
    <div>
      <h1>Level One Page</h1>
      <p>{message}</p>

      {/* ユーザー入力フォーム */}
      <form onSubmit={handleSubmit}>
        <label>
          Enter Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // ユーザー入力を更新
          />
        </label>
        <button type="submit">Submit</button>
      </form>

      {/* サーバーレスポンスの表示 */}
      <p>Response: {responseMessage}</p>
    </div>
  );
};

function App() {
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [responseMessage, setResponseMessage] = useState("");

  // フォーム送信処理
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await formCallApi(name);
      setResponseMessage(data.message);
    } catch (error) {
      setResponseMessage("Errorが発生しました。");
    }
  };

  // サーバーから初期データ取得
  useEffect(() => {
    getHelloMessage()
      .then((data) => setMessage(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Level One</Link>
            </li>
            <li>
              <Link to="/level2">Level Two</Link>
            </li>
            <li>
              <Link to="/Level2Add">Level Two Add User</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
              <LevelOne
                message={message}
                name={name}
                setName={setName}
                handleSubmit={handleSubmit}
                responseMessage={responseMessage}
              />
            }
          />
          <Route path="/level2" element={<LevelTwo />} />
          <Route path="/level2Add" element={<LevelTwoAdd/>} />
        </Routes>

        
        
      </div>
    </Router>
  );
}

export default App;

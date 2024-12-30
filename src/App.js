import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import LevelTwo from "./lv2/LevelTwo";
import LevelTwoAdd from "./lv2/LevelTwoAdd";
import Login from "./lv3/Login";

const PrivateRoute = ({ token, children }) => {
  return token ? children : <Navigate to="/login" />;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("authToken") || null); // ログイン状態を保持

  const handleLogout = () => {
    localStorage.removeItem("authToken"); // ローカルストレージからトークンを削除
    setToken(null);
  };

  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Level One</Link>
            </li>
            <li>
              <Link to="/level2">Level Two</Link>
            </li>
            <li>
              <Link to="/level2Add">Level Two Add User</Link>
            </li>
            {token && (
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            )}
          </ul>
        </nav>

        <Routes>
          {/* ログインページ */}
          <Route path="/login" element={<Login onLogin={setToken} />} />

          {/* 認証が必要なルート */}
          <Route
            path="/"
            element={
              <PrivateRoute token={token}>
                <h1>Level One</h1>
              </PrivateRoute>
            }
          />
          <Route
            path="/level2"
            element={
              <PrivateRoute token={token}>
                <LevelTwo />
              </PrivateRoute>
            }
          />
          <Route
            path="/level2Add"
            element={
              <PrivateRoute token={token}>
                <LevelTwoAdd />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

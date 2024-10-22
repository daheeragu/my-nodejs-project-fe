import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";
import RegisterPage from "./pages/RegisterPage";
import { useEffect, useState } from "react";
import PrivateRoute from "./route/PrivateRoute";
import api from "./utils/api";

function App() {
  // 유저정보가 여러 페이지에서 쓰일 가능성이 있기 때문에 App.js에 기입
  const [user, setUser] = useState(null);
  const getUser = async () => {
    try {
      const storedToken = sessionStorage.getItem("token");
      // token을 헤더에 보내줘야 하는데 이 처리는 utils/api.js에서 설정
      if (storedToken) {
        const response = await api.get("/user/me");
        setUser(response.data.user);
      }
    } catch (error) {
      setUser(null);
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute user={user}>
            <TodoPage setUser={setUser} />
          </PrivateRoute>
        }
      />
      <Route path="/register" element={<RegisterPage />} />
      <Route
        path="/login"
        element={<LoginPage user={user} setUser={setUser} />}
      />
    </Routes>
  );
}

export default App;

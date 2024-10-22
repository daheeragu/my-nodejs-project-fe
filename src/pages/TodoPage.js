import React, { useEffect, useState } from "react";
import TodoBoard from "../components/TodoBoard";
import api from "../utils/api";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const TodoPage = ({ setUser }) => {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState("");
  const navigate = useNavigate();
  // 전체 할일 불러오기
  const getTasks = async () => {
    const response = await api.get("/tasks");
    console.log("rrr", response.data.data);
    setTodoList(response.data.data);
  };
  // 랜더링시 이하의 함수 실행해 브라우저에서 보여주기
  useEffect(() => {
    getTasks();
  }, []);
  //추가하기
  const addTodo = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        getTasks();
      }
      setTodoValue("");
    } catch (error) {
      console.log("error:", error);
    }
  };
  // 삭제하기
  const deleteItem = async (id) => {
    try {
      console.log(id);
      const response = await api.delete(`/tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  // 상태 바꾸기
  const toggleComplete = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isCompleted: !task.isCompleted,
      });
      if (response.status === 200) {
        getTasks();
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  //로그아웃
  const handleLogout = () => {
    //세션스토리지 토큰 제거
    sessionStorage.removeItem("token");
    //유저 스테이트 null로 설정
    setUser(null);
    // 로그인 페이지로 리다이렉트
    navigate("/login");
  };
  return (
    <div>
      <Container>
        <div className="logout-container">
          <button className="button-logout" onClick={handleLogout}>
            로그아웃
          </button>
        </div>
        <Row className="add-item-row">
          <Col xs={12} sm={10}>
            <input
              type="text"
              placeholder="할일을 입력하세요"
              onChange={(event) => setTodoValue(event.target.value)}
              className="input-box"
              value={todoValue}
            />
          </Col>
          <Col xs={12} sm={2}>
            <button onClick={addTodo} className="button-add">
              추가
            </button>
          </Col>
        </Row>

        <TodoBoard
          todoList={todoList}
          deleteItem={deleteItem}
          toggleComplete={toggleComplete}
        />
      </Container>
    </div>
  );
};

export default TodoPage;

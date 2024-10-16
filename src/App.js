import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import TodoBoard from "./components/TodoBoard";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { useState, useEffect } from "react";
import api from "./utils/api";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [todoValue, setTodoValue] = useState([]);

  const getTasks = async () => {
    try {
      const response = await api.get("/tasks");
      if (response.status === 200) {
        setTodoList(response.data.data);
      } else {
        console.log("ERROR", response.data.error);
      }
    } catch (error) {
      console.log("API 호출 에러", error);
    }
  };

  const addTask = async () => {
    try {
      const response = await api.post("/tasks", {
        task: todoValue,
        isCompleted: false,
      });
      if (response.status === 200) {
        console.log("성공");
        //1. 입력한 값이 사라지지 않음
        setTodoValue("");
        //2. 추가한 값이 보이지 않음
        getTasks(); // POST 요청 후 다시 GET 요청하여 상태 업데이트
      } else {
        throw new Error("task can not be added");
      }
    } catch (err) {
      console.log("Error", err);
    }
  };
  // 완료 / 미완료 상태 변화 기능
  const changeIsCompleted = async (id) => {
    try {
      const task = todoList.find((item) => item._id === id);
      const response = await api.put(`/tasks/${id}`, {
        isCompleted: !task.isCompleted,
      });

      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  //식제 기능
  const deleteOne = async (id) => {
    try {
      const response = await api.delete(`tasks/${id}`);
      if (response.status === 200) {
        getTasks();
      }
    } catch (err) {
      console.log("error", err);
    }
  };
  useEffect(() => {
    getTasks();
  }, []);

  return (
    <Container>
      <Row className="add-item-row">
        <Col xs={12} sm={10}>
          <input
            type="text"
            placeholder="할일을 입력하세요"
            className="input-box"
            value={todoValue}
            onChange={(event) => setTodoValue(event.target.value)}
          />
        </Col>
        <Col xs={12} sm={2}>
          <button className="button-add" onClick={addTask}>
            추가
          </button>
        </Col>
      </Row>

      <TodoBoard
        todoList={todoList}
        changeIsCompleted={changeIsCompleted}
        deleteOne={deleteOne}
      />
    </Container>
  );
}

export default App;

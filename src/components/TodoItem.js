import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, toggleComplete, deleteItem }) => {
  const id = item._id;
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Row>
      <Col xs={12}>
        <div
          className={`todo-item ${item.isCompleted ? "item-completed" : ""}`}
        >
          <div className="todo-content">{item.task}</div>
          <div>by {item.author.name}</div>
          <div>
            <button
              className="button-delete"
              onClick={() => deleteItem(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => toggleComplete(item._id)}
            >
              {item.isCompleted ? `안끝남` : `끝남`}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;

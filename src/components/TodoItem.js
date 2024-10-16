import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";

const TodoItem = ({ item, changeIsCompleted, deleteOne }) => {
  const id = item._id;
  const [isCompleted, setIsCompleted] = useState(false);

  return (
    <Row>
      <Col xs={12}>
        {/* className을 동적으로 처리 */}
        <div className={`todo-item ${item.isCompleted ? "item-complete" : ""}`}>
          <div className="todo-content">{item.task}</div>

          <div>
            <button
              className="button-delete"
              onClick={() => deleteOne(item._id)}
            >
              삭제
            </button>
            <button
              className="button-delete"
              onClick={() => changeIsCompleted(item._id)}
            >
              {item.isCompleted ? "완료" : "미완료"}
            </button>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default TodoItem;

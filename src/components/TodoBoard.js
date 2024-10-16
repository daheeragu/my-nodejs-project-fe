import React from "react";
import TodoItem from "./TodoItem";

const TodoBoard = ({ todoList, changeIsCompleted, deleteOne }) => {
  return (
    <div>
      <h2>Todo List</h2>
      {todoList.length > 0 ? (
        todoList.map((item) => (
          <TodoItem
            item={item}
            changeIsCompleted={changeIsCompleted}
            deleteOne={deleteOne}
          />
        ))
      ) : (
        <h2>There is no Item to show</h2>
      )}
      {/* <TodoItem/> will be here once we get the todoList */}
    </div>
  );
};

export default TodoBoard;

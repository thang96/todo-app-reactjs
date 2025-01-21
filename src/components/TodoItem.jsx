import React from "react";

const TodoItem = (props) => {
  return (
    <div
      className="todo-item"
      onClick={() => {
        props.handleChangeTodoItem(props.id);
      }}
    >
      <div style={{ display: "flex", gap: 5 }}>
        <input
          type="checkbox"
          checked={props.isCompleted}
          onClick={(e) => {
            e.stopPropagation();
          }}
          onChange={() => {
            props.handleChangeCheckBox(props.id);
          }}
        />
        <p className="todo-item-text">{props?.name}</p>
      </div>
      {props.isImportant && <p className="">⭐</p>}
    </div>
  );
};

export default TodoItem;

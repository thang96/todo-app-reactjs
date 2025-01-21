import React, { useState } from "react";
import "./Sidebar.css";

const SideBar = (props) => {
  const data = props?.todoItem;
  const [name, setName] = useState(data?.name);
  const [isImportant, setIsImportant] = useState(data?.isImportant);
  const [isCompleted, setIsCompleted] = useState(data?.isCompleted);

  const handleSave = () => {
    const newTodo = {
      ...data,
      name: name,
      isImportant: isImportant,
      isCompleted: isCompleted,
    };
    props.handleTodoItemChange(newTodo);
  };

  return (
    <>
      <div className="sidebar">
        <form action="" className="sb-form">
          <div className="sb-form-field">
            <label htmlFor="sb-name">Todo name</label>
            <input
              type="text"
              id="sb-name"
              name="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="sb-form-field">
            <label htmlFor="sb-name">Is important?</label>
            <input
              type="checkbox"
              id="sb-important"
              name="is-important"
              checked={isImportant}
              onChange={() => {
                setIsImportant(!isImportant);
              }}
            />
          </div>
          <div className="sb-form-field">
            <label htmlFor="sb-name">Is completed?</label>
            <input
              type="checkbox"
              id="sb-completed"
              name="is-completed"
              checked={isCompleted}
              onChange={() => {
                setIsCompleted(!isCompleted);
              }}
            />
          </div>
        </form>
        <div className="sb-footter">
          <button onClick={handleSave}>Save</button>
          <button onClick={props.onCancel}>Cancel</button>
        </div>
      </div>
    </>
  );
};

export default SideBar;

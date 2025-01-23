import { useState } from "react";
import "./Sidebar.css";
import PropTypes from "prop-types";
import { CATEGORY_ITEM } from "../constanst";

const SideBar = (props) => {
  const data = props?.todoItem;
  const [name, setName] = useState(data?.name);
  const [isImportant, setIsImportant] = useState(data?.isImportant);
  const [isCompleted, setIsCompleted] = useState(data?.isCompleted);
  const [category, setCategory] = useState(data?.category);

  const handleSave = () => {
    const newTodo = {
      ...data,
      name: name,
      isImportant: isImportant,
      isCompleted: isCompleted,
      category:category
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
          <div className="sb-form-field">
            <label htmlFor="sb-category">Category</label>
            <select id="sb-completed" onChange={(e)=>{
              setCategory(e.target.value)
            }}>
              {CATEGORY_ITEM.map((item) => {
                return (
                  <option key={item.id} value={item.id}>
                    {item.label}
                  </option>
                );
              })}
            </select>
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

SideBar.propTypes = {
  handleTodoItemChange: PropTypes.func,
  onCancel: PropTypes.func,
  todoItem: PropTypes.shape({
    name: PropTypes.string,
    isImportant: PropTypes.bool,
    isCompleted: PropTypes.bool,
    category: PropTypes.string,
  }),
};

export default SideBar;

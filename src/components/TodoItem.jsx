import PropTypes from "prop-types";

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
          style={{ cursor: "pointer" }}
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

TodoItem.propTypes = {
  handleChangeTodoItem: PropTypes.func,
  handleChangeCheckBox: PropTypes.func,
  isImportant: PropTypes.bool,
  isCompleted: PropTypes.bool,
  id: PropTypes.string,
  name: PropTypes.name,
};

export default TodoItem;

import { useRef, useState } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import SideBar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";

function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, name: "Đi học thêm", isImportant: false, isCompleted: true },
    { id: 2, name: "Học bài", isImportant: true, isCompleted: true },
    { id: 3, name: "Học code", isImportant: true, isCompleted: false },
    { id: 4, name: "Đi chợ", isImportant: false, isCompleted: false },
  ]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState(undefined);
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const inputRef = useRef();
  
  const handleCompleteCheckBox = (todoId) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === todoId) {
        return { ...todo, isCompleted: !todo.isCompleted };
      }
      return todo;
    });

    setTodoList(newTodoList);
  };

  const handleTodoItemClick = (todoId) => {
    setShowSideBar(true);
    setActiveTodoItemId(todoId);
  };

  const handleCloseSidebar = () => {
    setShowSideBar(false);
  };

  const handleTodoItemChange = (newTodo) => {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === newTodo?.id) {
        return newTodo;
      }
      return todo;
    });

    setTodoList(newTodoList);
    setShowSideBar(false);
  };

  const todos = todoList.map((todo, index) => {
    return (
      <TodoItem
        id={todo.id}
        name={todo.name}
        key={todo.id}
        isImportant={todo.isImportant}
        isCompleted={todo.isCompleted}
        handleChangeTodoItem={handleTodoItemClick}
        handleChangeCheckBox={handleCompleteCheckBox}
      />
    );
  });

  return (
    <>
      <div className="container">
        <FilterPanel
          selectedFilterId={selectedFilterId}
          setSelectedFilterId={(id) => {
            setSelectedFilterId(id);
          }}
        />
        <div className="main-container">
          <input
            ref={inputRef}
            type="text"
            name="add-new-task"
            placeholder="Add new task"
            className="task-input"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                const value = e.target.value;
                setTodoList([
                  ...todoList,
                  {
                    id: crypto.randomUUID(),
                    name: value,
                    isImportant: false,
                    isCompleted: false,
                  },
                ]);
                inputRef.current.value = "";
              }
            }}
          />
          <div>{todos}</div>
          {showSideBar && (
            <SideBar
              key={activeTodoItemId}
              todoItem={activeTodoItem}
              handleTodoItemChange={handleTodoItemChange}
              onCancel={handleCloseSidebar}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default App;

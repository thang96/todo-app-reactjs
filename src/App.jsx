import { useMemo, useRef } from "react";
import "./App.css";
import TodoItem from "./components/TodoItem";
import SideBar from "./components/Sidebar";
import FilterPanel from "./components/FilterPanel";
import { AppContext, useAppContext } from "./context/AppProvider";

function App() {
  const {
    selectedCategoryId,
    todoList,
    setTodoList,
    showSideBar,
    activeTodoItemId,
    selectedFilterId,
    searchText,
    handleCompleteCheckBox,
    handleTodoItemClick,
    handleCloseSidebar,
    handleTodoItemChange,
  } = useAppContext(AppContext);

  const activeTodoItem = todoList.find((todo) => todo.id === activeTodoItemId);

  const inputRef = useRef();

  const handleAddTodo = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      setTodoList([
        ...todoList,
        {
          id: crypto.randomUUID(),
          name: value,
          isImportant: false,
          isCompleted: false,
          isDeletedd: false,
          category: "personal",
        },
      ]);
      inputRef.current.value = "";
    }
  };

  const filterTodos = useMemo(() => {
    return todoList.filter((todo) => {
      if (
        !todo.name.toLocaleLowerCase().includes(searchText.toLocaleLowerCase())
      ) {
        return false;
      }
      if (selectedCategoryId && selectedCategoryId !== todo.category) {
        return false;
      }
      switch (selectedFilterId) {
        case "all":
          return true;
        case "important":
          return todo.isImportant;
        case "completed":
          return todo.isCompleted;
        case "delete":
          return todo.isDeleted;
        default:
          return true;
      }
    });
  }, [todoList, selectedFilterId, searchText, selectedCategoryId]);

  const renderTodoItem = () => {
    return filterTodos.map((todo) => {
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
  };

  return (
    <>
      <div className="container">
        <FilterPanel />
        <div className="main-container">
          <input
            ref={inputRef}
            type="text"
            name="add-new-task"
            placeholder="Add new task"
            className="task-input"
            onKeyDown={(e) => {
              handleAddTodo(e);
            }}
          />
          <div>{renderTodoItem()}</div>
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

import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [todoList, setTodoList] = useState([
    {
      id: "1",
      name: "Đi học thêm",
      isImportant: false,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "2",
      name: "Học bài",
      isImportant: true,
      isCompleted: true,
      isDeleted: false,
      category: "personal",
    },
    {
      id: "3",
      name: "Học code",
      isImportant: true,
      isCompleted: false,
      isDeleted: false,
      category: "company",
    },
    {
      id: "4",
      name: "Đi chợ",
      isImportant: false,
      isCompleted: false,
      isDeleted: false,
      category: "travel",
    },
  ]);
  const [showSideBar, setShowSideBar] = useState(false);
  const [activeTodoItemId, setActiveTodoItemId] = useState(undefined);
  const [selectedFilterId, setSelectedFilterId] = useState("all");
  const [searchText, setSearchText] = useState("");

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
  

  return (
    <AppContext.Provider
      value={{
        selectedCategoryId,
        setSelectedCategoryId,
        todoList,
        setTodoList,
        showSideBar,
        setShowSideBar,
        activeTodoItemId,
        setActiveTodoItemId,
        selectedFilterId,
        setSelectedFilterId,
        searchText,
        setSearchText,
        handleCompleteCheckBox,
        handleTodoItemClick,
        handleCloseSidebar,
        handleTodoItemChange
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.element,
};

export default AppProvider;
export const useAppContext = () => {
  return useContext(AppContext);
};

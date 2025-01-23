import { useMemo } from "react";
import "./FilterPanel.css";
import PropTypes from "prop-types";
import CategoryList from "./CategoryList";
import { FILTER_ITEM } from "../constanst";
import { AppContext, useAppContext } from "../context/AppProvider";

const FilterPanel = () => {
  const {
    todoList,
    selectedFilterId,
    setSelectedFilterId,
    searchText,
    setSearchText,
  } = useAppContext(AppContext);

  const countByFilterType = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        let newAcc = { ...acc };
        if (cur.isCompleted) {
          newAcc = { ...newAcc, completed: newAcc.completed + 1 };
        }
        if (cur.isImportant) {
          newAcc = { ...newAcc, important: newAcc.important + 1 };
        }
        if (cur.isDeleted) {
          newAcc = { ...newAcc, deleted: newAcc.deleted + 1 };
        }
        return newAcc;
      },
      { all: todoList.length, important: 0, completed: 0, deleted: 0 }
    );
  }, [todoList]);

  const renderFilterItem = () => {
    return FILTER_ITEM.map((item) => {
      return (
        <div
          key={item.id}
          className={`filter-item ${
            item.id === selectedFilterId ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedFilterId(item.id);
          }}
        >
          <div className="filter-name">
            <img src={item.iconPath} alt="" />
            <p>{item.label}</p>
          </div>
          <p>{countByFilterType[item.id]}</p>
        </div>
      );
    });
  };

  return (
    <>
      <div className="filter-panel">
        <input
          type="text"
          name="search-text"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />
        <div className="filter-container">{renderFilterItem()}</div>
        <CategoryList />
      </div>
    </>
  );
};

FilterPanel.propTypes = {
  selectedFilterId: PropTypes.string,
  setSelectedFilterId: PropTypes.func,
  todoList: PropTypes.array,
  searchText: PropTypes.string,
  setSearchText: PropTypes.func,
};

export default FilterPanel;

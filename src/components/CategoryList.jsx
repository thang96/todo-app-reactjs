import PropTypes from "prop-types";
import "./CategoryList.css";
import { CATEGORY_ITEM } from "../constanst";
import { useMemo } from "react";
import { AppContext, useAppContext } from "../context/AppProvider";

const CategoryList = () => {
  const { selectedCategoryId, setSelectedCategoryId, todoList } =
    useAppContext(AppContext);

  const countByCategory = useMemo(() => {
    return todoList.reduce(
      (acc, cur) => {
        return { ...acc, [cur.category]: acc[cur.category] + 1 };
      },
      {
        personal: 0,
        company: 0,
        travel: 0,
        idea: 0,
      }
    );
  }, [todoList]);

  const renderCategories = () => {
    return CATEGORY_ITEM.map((category) => {
      return (
        <div
          key={category.id}
          className={`category-item ${
            category.id === selectedCategoryId ? "selected" : ""
          }`}
          onClick={() => {
            setSelectedCategoryId(category.id);
          }}
        >
          <p className="category-name">{category.label}</p>
          <p>{countByCategory[category.id]}</p>
        </div>
      );
    });
  };

  return (
    <>
      <p>Categories</p>
      <div className="categories-container">
        <div>{renderCategories()}</div>
      </div>
    </>
  );
};

CategoryList.propTypes = {
  CATEGORY_ITEM: PropTypes.array,
  selectedCategoryId: PropTypes.string,
  setSelectedCategoryId: PropTypes.func,
  todoList: PropTypes.array,
};

export default CategoryList;

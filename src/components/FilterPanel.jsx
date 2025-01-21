import React, { useState } from "react";
import "./FilterPanel.css";
const FILTER_ITEM = [
  {
    id: "all",
    label: "All",
    iconPath: "./public/inbox.png",
    value: 10,
  },
  {
    id: "important",
    label: "Important",
    iconPath: "./public/flag.png",
    value: 11,
  },
  {
    id: "completed",
    label: "Completed",
    iconPath: "./public/check.png",
    value: 12,
  },
  {
    id: "delete",
    label: "Delete",
    iconPath: "./public/delete.png",
    value: 13,
  },
];

const FilterPanel = (props) => {
  return (
    <>
      <div className="filter-panel">
        <input type="text" name="search-text" />
        <div className="filter-container">
          {FILTER_ITEM.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`filter-item ${
                  item.id === props.selectedFilterId ? "selected" : ""
                }`}
                onClick={() => {
                  props.setSelectedFilterId(item.id);
                }}
              >
                <div className="filter-name">
                  <img src={item.iconPath} alt="" />
                  <p>{item.label}</p>
                </div>
                <p>{item.value}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default FilterPanel;

import React from 'react';
import './SortOptions.css';

const SortOptions = ({ onSort }) => {
  return (
    <div className="sort-options-container">
      <select className="sort-select" onChange={(e) => onSort(e.target.value)}>
        <option value="">Sort</option>
        <option value="asc">Sort A-Z</option>
        <option value="desc">Sort Z-A</option>
      </select>
    </div>
  );
};

export default SortOptions;

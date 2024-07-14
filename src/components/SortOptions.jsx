import React from 'react';

const SortOptions = ({ onSort }) => {
  return (
    <button onClick={() => onSort()}>Sort Alphabetically</button>
  );
};

export default SortOptions;

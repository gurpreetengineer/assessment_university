import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ItemList = ({ items, onDelete, onSelect }) => {
  const [deletingIndex, setDeletingIndex] = useState(null);

  const handleDelete = (index) => {
    setDeletingIndex(index);
    setTimeout(() => {
      onDelete(index);
      setDeletingIndex(null);
    }, 500);
  };

  return (
    <div>
      {items.map((item, index) => (
        <div key={index} className={deletingIndex === index ? 'fade-out' : ''}>
          <Link to="/details">
            <h3 onClick={() => onSelect(item)}>{item.name}</h3>
          </Link>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

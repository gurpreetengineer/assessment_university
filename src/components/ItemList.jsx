import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ItemList.css';

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
    <div className="item-list-container">
      {items.map((item, index) => (
        <div
          key={index}
          className={deletingIndex === index ? 'fade-out card' : 'card'}
          onClick={() => onSelect(item)}
        >
          <Link to="/details">
            <h2>{item?.name}</h2>
            <p>
              <strong>Country:</strong> {item?.country}
            </p>
            <p>
              <strong>Domain:</strong> {item?.domains?.join(', ')}
            </p>
            <p>
              <strong>Webiste:</strong> {item?.web_pages?.join(', ')}
            </p>
          </Link>
          <button onClick={() => handleDelete(index)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default ItemList;

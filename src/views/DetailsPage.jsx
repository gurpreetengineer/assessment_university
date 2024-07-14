import React from 'react';
import ItemDetails from '../components/ItemDetails';
import './DetailsPage.css';

const DetailsPage = ({ item }) => {
  return (
    <div className="details-page container">
      <div className="details-header">
        <h2>University Details</h2>
      </div>
      <div className="details-content">
        <ItemDetails item={item} />
      </div>
    </div>
  );
};

export default DetailsPage;

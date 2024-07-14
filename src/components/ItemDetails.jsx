import React, { useState, useEffect, Fragment } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';
import { Link } from 'react-router-dom';

const ItemDetails = ({ item }) => {
  const [alreadySelectedItem, setAlreadySelectedItem] = useState(item);
  useEffect(() => {
    if(!item) {
      setAlreadySelectedItem(getFromLocalStorage(process.env.REACT_APP_STORAGE_KEY_TWO));
    }
  }, [item]);
  return (
    <div>
      {alreadySelectedItem ? <Fragment>
        <h2>{alreadySelectedItem?.name}</h2>
        <p><strong>Country:</strong> {alreadySelectedItem?.country}</p>
        <p><strong>Domain:</strong> {alreadySelectedItem?.domains?.join(', ')}</p>
        <p><strong>Webiste:</strong> {alreadySelectedItem?.web_pages?.join(', ')}</p>
        <Link to="/">
          <button style={{marginTop: '12px'}}> Go back </button>
        </Link>
      </Fragment> : 
      <Fragment>
        <p><em>Please select a University to display details</em></p>
      </Fragment>}
      
    </div>
  );
};

export default ItemDetails;

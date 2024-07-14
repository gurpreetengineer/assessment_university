import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListingPage from './views/ListingPage';
import DetailsPage from './views/DetailsPage';
import { saveToLocalStorage } from './utils/localStorage';
import './App.css';

const App = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleSelectItem = (item) => {
    setSelectedItem(item);
    saveToLocalStorage(process.env.REACT_APP_STORAGE_KEY_TWO, item)
  };

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<ListingPage onSelectItem={handleSelectItem} />} />
        <Route path="/details" element={<DetailsPage item={selectedItem} />} />
      </Routes>
    </Router>
  );
};

export default App;

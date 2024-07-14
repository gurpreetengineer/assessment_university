// Inside ListingPage.jsx
import React, { useEffect, useState } from 'react';
import {saveToLocalStorage, removeItemFromLocalStorage} from '../utils/localStorage';
import { getItems } from '../controllers/itemController';
import ItemList from '../components/ItemList';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import './ListingPage.css';

const ListingPage = ({ onSelectItem }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Initialize isLoading to true

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const data = await getItems();
        setItems(data);
        setIsLoading(false); // Set isLoading to false after data is fetched
      } catch (error) {
        console.error("Failed to fetch items", error);
        setIsLoading(false); // Set isLoading to false in case of error
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    saveToLocalStorage(process.env.REACT_APP_STORAGE_KEY_ONE, items);
    removeItemFromLocalStorage(process.env.REACT_APP_STORAGE_KEY_TWO);
    // Filter items based on search query
    const filtered = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredItems(filtered);
  }, [items, searchQuery]);

  const handleDelete = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSort = () => {
    setItems(prevItems => [...prevItems].sort((a, b) => a.name.localeCompare(b.name)));
  };

  return (
    <div className="listing-page container">
      <SearchBar onSearch={handleSearch} />
      <SortOptions onSort={handleSort} />
      {isLoading && <p>Data is loading...</p>} {/* Show loading message if isLoading is true */}
      {!isLoading && filteredItems.length === 0 && (
        <p>No results found</p>
      )}
      <ItemList items={filteredItems} onDelete={handleDelete} onSelect={onSelectItem} />
    </div>
  );
};

export default ListingPage;

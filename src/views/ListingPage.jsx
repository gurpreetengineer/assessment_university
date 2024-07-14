import React, { useEffect, useState } from 'react';
import {saveToLocalStorage, removeItemFromLocalStorage, getFromLocalStorage} from '../utils/localStorage';
import { getItems } from '../controllers/itemController';
import ItemList from '../components/ItemList';
import SearchBar from '../components/SearchBar';
import SortOptions from '../components/SortOptions';
import './ListingPage.css';
import FilterOptions from '../components/FilterOptions';

const ListingPage = ({ onSelectItem }) => {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [universities, setUniversities] = useState([]);
  const [selectedFilters, setSelectedFilters] = useState({});

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
    // const filtered = items.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()));
    setFilteredItems(items);
    setUniversities(getFromLocalStorage(process.env.REACT_APP_STORAGE_KEY_ONE));
  }, [items]);

  const handleDelete = (index) => {
    setItems(prevItems => prevItems.filter((_, i) => i !== index));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  
    // Filter items based on search query and selected filters
    const filtered = universities.filter(university =>
      Object.keys(selectedFilters).every(filterKey => {
        if (!selectedFilters[filterKey] || selectedFilters[filterKey] === 'All') {
          return true;
        }
        if (filterKey === 'domains' || filterKey === 'web_pages') {
          return university[filterKey][0] === selectedFilters[filterKey];
        }
        return university[filterKey] === selectedFilters[filterKey];
      })
    );
  
    const searchFiltered = filtered.filter(university =>
      university.name.toLowerCase().includes(query.toLowerCase())
    );
  
    setFilteredItems(searchFiltered);
  };

  const handleSort = (order) => {
    const sortedItems = [...items].sort((a, b) => {
      if (order === 'asc') {
        return a.name.localeCompare(b.name);
      } else if (order === 'desc') {
        return b.name.localeCompare(a.name);
      }
      // Handle other cases or defaults here
      return 0;
    });

    setItems(sortedItems);
  };

  const handleFilterChange = (key, value) => {
    setSelectedFilters(prevFilters => {
      const newFilters = {
        ...prevFilters,
        [key]: value,
      };
  
      const filtered = universities.filter(university =>
        Object.keys(newFilters).every(filterKey => {
          if (!newFilters[filterKey] || newFilters[filterKey] === 'All') {
            return true;
          }
          if (filterKey === 'domains' || filterKey === 'web_pages') {
            return university[filterKey][0] === newFilters[filterKey];
          }
          return university[filterKey] === newFilters[filterKey];
        })
      );
  
      const searchFiltered = filtered.filter(university =>
        university.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
  
      setFilteredItems(searchFiltered);
      return newFilters;
    });
  };
  

  const getUniqueValues = (key) => {
    const values = items.map(item => item[key]).filter(Boolean);
    return [...new Set(values)];
  };

  return (
    <div className="listing-page container">
      <div className="menuBar">
        <FilterOptions
          onFilter={handleSort}
          handleFilterChange={handleFilterChange}
          getUniqueValues={getUniqueValues}
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
        <SortOptions onSort={handleSort} />
        <SearchBar onSearch={handleSearch} />
      </div>
      {isLoading && <p className="loading-message">Data is loading...</p>}
      {!isLoading && filteredItems.length === 0 && (
        <p className="no-results-message">No results found</p>
      )}
      <ItemList
        items={filteredItems}
        onDelete={handleDelete}
        onSelect={onSelectItem}
      />
    </div>
  );
};

export default ListingPage;

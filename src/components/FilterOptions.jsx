import React, { useState, useEffect, useRef } from 'react';
import { getFromLocalStorage } from '../utils/localStorage';
import './FilterOptions.css';

function FilterOptions({ onFilter, handleFilterChange, getUniqueValues, selectedFilters, setSelectedFilters }) {
  const [showFilters, setShowFilters] = useState(false);
  const filterCardRef = useRef(null);

  useEffect(() => {
    const savedData = getFromLocalStorage(process.env.REACT_APP_STORAGE_KEY_ONE);
    if (savedData && savedData.length > 0) {
      const initialFilters = {};
      Object.keys(savedData[0]).forEach(key => {
        initialFilters[key] = '';
      });
      setSelectedFilters(initialFilters);
    }
  }, [setSelectedFilters]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterCardRef.current && !filterCardRef.current.contains(event.target)) {
        setShowFilters(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterCardRef]);

  return (
    <div>
       <button
      className="filter-button"
      onClick={() => setShowFilters(!showFilters)}
      disabled={showFilters} // Disable button if filters are already shown
    >
      Filter
    </button>
      {showFilters && (
        <div ref={filterCardRef} className="filter-card">
          <div className="popup">
            <div className="filters">
              {Object.keys(selectedFilters).map((key, index) => (
                <div key={index} className="filter">
                  <label htmlFor={key}>{key.replace(/[-_]/g, ' ').replace(/\b\w/g, char => char.toUpperCase())}</label>
                  <select
                    id={key}
                    value={selectedFilters[key]}
                    onChange={(e) => handleFilterChange(key, e.target.value)}
                  >
                    <option value='' default>All</option>
                    {getUniqueValues(key).map((value, idx) => (
                      <option key={idx} value={value}>
                        {value}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FilterOptions;

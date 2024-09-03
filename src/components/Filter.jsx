import React from 'react';
import searchIcon from '../assets/search.svg';
import clearIcon from '../assets/clear.svg';

function Filter({ items, filterText, onFilterTextChange, onFilteredItemsChange }) {

  // Filter items based on input
  const handleChange = (e) => {
    const text = e.target.value;
    onFilterTextChange(text); 
    const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase())
    );
    onFilteredItemsChange(filteredItems);
  };

  // Handle clearing text
  const handleClear = () => {
    onFilterTextChange(''); 
    onFilteredItemsChange(items);
  };

  return (
    <div className='input-icon-wrapper'>
      <input
        type='text'
        className='form-control mb-3'
        placeholder='Filter stations...'
        value={filterText}
        onChange={handleChange}
      />
      <span className='input-icon'>
        {filterText ? (
          // If there is text show clear icon
          <img
            src={clearIcon}
            alt='Clear'
            onClick={handleClear}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          // Otherwise show search icon
          <img
            src={searchIcon}
            alt='Search'
          />
        )}
      </span>
    </div>
  );
}

export default Filter;

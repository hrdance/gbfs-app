import React, { useState } from 'react';
import searchIcon from '../assets/search.svg';

function Filter({ items, onFilteredItemsChange }) {
  const [filterText, setFilterText] = useState('');

  // Function to filter items based on the text input
  const handleChange = (e) => {
    const text = e.target.value;
    setFilterText(text);

    // Filter items based on the input text and notify parent
    const filteredItems = items.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    onFilteredItemsChange(filteredItems);
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
        <img src={searchIcon} alt=''/>
      </span>
    </div>
  );
}

export default Filter;

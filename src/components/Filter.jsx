import React, { useState, useEffect } from 'react';

function Filter({ items, onFilteredItemsChange }) {
  const [filterText, setFilterText] = useState('');
  
  // Function to filter items based on the text input
  const filteredItems = items.filter(item =>
    item.toLowerCase().includes(filterText.toLowerCase())
  );

  // Update parent component with filtered items
  useEffect(() => {
    onFilteredItemsChange(filteredItems);
  }, [filterText, items]);

  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Filter items..."
      value={filterText}
      onChange={(e) => setFilterText(e.target.value)}
    />
  );
}

export default Filter;

import React, { useState, useEffect } from 'react';
import searchIcon from '../assets/search.svg';
import clearIcon from '../assets/clear.svg';
import check from '../assets/check.svg';
import uncheck from '../assets/uncheck.svg';
import bike from '../assets/bike.svg';
import electric from '../assets/electric.svg';

function Filter({ items, onFilteredItemsChange }) {

  // State
  const [filterText, setFilterText] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Apply text and radio filters whenever selections change
  useEffect(() => {
    applyFilters(filterText, selectedFilter);
  }, [filterText, selectedFilter, items]);

  // Handle text filter change
  const handleTextChange = (e) => {
    setFilterText(e.target.value);
  };

  // Handle radio button change
  const handleRadioChange = (e) => {
    setSelectedFilter(e.target.value);
  };

  // Apply both text and radio filters
  const applyFilters = (text, filter) => {
    let filteredItems = items;

    // Apply text filter
    if (text) {
      filteredItems = filteredItems.filter(item =>
        item.name.toLowerCase().includes(text.toLowerCase())
      );
    }

    // Apply radio filter
    if (filter === 'beryl') {
      filteredItems = filteredItems.filter(item => item.beryl_bike > 0 || item.bbe > 0);
    } else if (filter === 'electric') {
      filteredItems = filteredItems.filter(item => item.bbe > 0);
    }

    onFilteredItemsChange(filteredItems);
  };

  // Handle clearing text
  const handleClear = () => {
    setFilterText('');
    setSelectedFilter('all');
    onFilteredItemsChange(items);
  };

  return (
    <div className='input-icon-wrapper'>
      <input
        type='text'
        className='form-control mb-3'
        placeholder='Filter stations...'
        value={filterText}
        onChange={handleTextChange}
      />
      <span className='input-icon'>
        {filterText ? (
          <img
            src={clearIcon}
            alt='Clear'
            onClick={handleClear}
            style={{ cursor: 'pointer' }}
          />
        ) : (
          <img
            src={searchIcon}
            alt='Search'
          />
        )}
      </span>
      <div className="btn-group d-flex pb-3" role="group" aria-label="Bike types toggle">
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autoComplete="off"
          value="all"
          checked={selectedFilter === 'all'}
          onChange={handleRadioChange}
        />
        <label className="btn btn-light custom-radio" htmlFor="btnradio1">
          <img src={uncheck} height={18} width={18} alt="Empty checkbox" />
          <img src={bike} height={20} width={20} alt="Bike" />
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autoComplete="off"
          value="beryl"
          checked={selectedFilter === 'beryl'}
          onChange={handleRadioChange}
        />
        <label className="btn btn-light custom-radio" htmlFor="btnradio2">
          <img src={check} height={18} width={18} alt="Checked box" />
          <img src={bike} height={20} width={20} alt="Has bikes available" />
        </label>
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autoComplete="off"
          value="electric"
          checked={selectedFilter === 'electric'}
          onChange={handleRadioChange}
        />
        <label className="btn btn-light custom-radio" htmlFor="btnradio3">
          <img src={check} height={18} width={18} alt="Checked box" />
          <img src={electric} height={20} width={20} alt="Has electric bikes available" />
        </label>
      </div>
    </div>
  );
}

export default Filter;

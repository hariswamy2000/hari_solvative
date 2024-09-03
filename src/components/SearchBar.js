import React from 'react';
import './SearchBar.css'; // Import the CSS file for styling

const SearchBar = ({ searchTerm, setSearchTerm, searchInputRef }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      // Trigger the search when Enter is pressed
      // This is handled by the state change in the parent component
    }
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={searchInputRef}
        placeholder="Search places..."
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;


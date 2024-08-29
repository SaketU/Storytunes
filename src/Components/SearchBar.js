import React from 'react';

const SearchBar = ({ theme, handleThemeChange, handleEnter }) => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px', marginTop: '20px' }}>
    <input
      type="text"
      placeholder="Enter theme"
      value={theme}
      onChange={handleThemeChange}
      style={{
        padding: '10px',
        borderRadius: '20px',
        border: '2px solid black',
        backgroundColor: 'white',
        width: '180px',
        boxSizing: 'border-box',
      }}
    />
    <button
      onClick={handleEnter}
      style={{
        padding: '10px 20px',
        borderRadius: '20px',
        border: '2px solid black',
        backgroundColor: 'blue',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
      }}
    >
      Enter
    </button>
  </div>
);

export default SearchBar;

import React, { Component } from 'react';

import './SearchInput.css';

class SearchInput extends Component {
  render() {
    return (
      <div className="search-box">
        <input type="text" id="search-input" className="search-input" />
        <i className="fas fa-search search-logo" />
      </div>
    );
  }
}

export default SearchInput;

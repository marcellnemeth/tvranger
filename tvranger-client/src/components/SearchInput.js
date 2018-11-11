import React, { Component } from 'react';

import './SearchInput.css';

class SearchInput extends Component {

  onInputChange = event => {
    this.props.onSearchTermChange(event.target.value,1);
  }

  render() {
    return (
      <div className="search-box">
        <input onChange={this.onInputChange} type="text" id="search-input" className="search-input" />
        <i className="fas fa-search search-logo" />
      </div>
    );
  }
}

export default SearchInput;

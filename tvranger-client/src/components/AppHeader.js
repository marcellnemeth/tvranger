import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './AppHeader.css';

class AppHeader extends Component {
  handleLogout = () => {
    this.props.onLogout();
  }

  renderHeader = () => {
    var header;
    console.log(this.props.currentUser);
    if (this.props.currentUser) {
      console.log("I was here");
      return (
        <header className="main-header">
          <h1 className="name">
            <Link to="/">Tv Ranger</Link>
          </h1>
          <ul className="main-nav">
            <li>
              <Link to="/" onClick={this.handleLogout}>Logout</Link>
            </li>
            <li>
              <Link to="/watchlist">watchlist</Link>
            </li>
            <li>
              <a href="#!">favourites</a>
            </li>
          </ul>
        </header>
      );
    } else {
      return (
        <header className="main-header">
          <h1 className="name">
            <Link to="/">Tv Ranger</Link>
          </h1>
          <ul className="main-nav">
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </header>
      );
    }
  }
  render() {
   
    return(
      <div className="main-header-container" >
        {this.renderHeader()}
      </div>
    );
  }
}

export default AppHeader;

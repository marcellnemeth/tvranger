import React from 'react';

import './AppHeader.css';

const AppHeader = () => {
  return (
    <div className="main-header-container">
      <header className="main-header">
        <h1 className="name">
          <a href="/">Tv Ranger</a>
        </h1>
        <ul className="main-nav">
          <li>
            <a href="/login">Login</a>
          </li>
          <li>
            <a href="/signup">Signup</a>
          </li>
          <li>
            <a href="#!">Third</a>
          </li>
        </ul>
      </header>
    </div>
  );
};

export default AppHeader;

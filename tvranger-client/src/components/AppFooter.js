import React from 'react';
import logo from '../assets/images/tmdb.svg';

import './AppFooter.css';

const AppFooter = () => {
  return (
    <footer className="main-footer">
      <span className="footer-text">
        &copy;2018 The best site for show tracking experiences.
      </span>
      <img src={logo} className="tmdb-logo" alt="TMDB logo" />
    </footer>
  );
};

export default AppFooter;

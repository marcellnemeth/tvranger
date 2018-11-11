import React from "react";

import SearchInput from "./SearchInput";

import AppLogo from "../assets/images/television.svg";
import "./Banner.css";

const Banner = (props) => {
  return (
    <div className="banner-wrapper">
      <div className="banner">
        <object
          type="image/svg+xml"
          data={AppLogo}
          className="app-logo"
          height={300}
        >Page logo</object>
        <h1 className="search-title">Find your favourite...</h1>
        <SearchInput onSearchTermChange={props.onSearchTermChange} />
      </div>
    </div>
  );
};

export default Banner;

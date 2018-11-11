import React, { Component } from 'react';

import ShowIcon from '../components/ShowIcon.js';

import NotFound from '../assets/images/notfound.jpg';
import { Link } from 'react-router-dom';

import './TvShowListItem.css';

class TvShowListItem extends Component {
  handleClick = () => {
    this.props.fetchShowWithId(this.props.show.id);
  };

  render() {
    const { show, onItemClick, activeItems } = this.props;
    var profileLink = `/show/profile/${show.id}`;
    let posterImg = null;

    if (show.poster_path) {
      let posterPath = `https://image.tmdb.org/t/p/w342/${show.poster_path}`;
      posterImg = <img src={posterPath} className="card-img" alt="Show Poster"/>;
    } else {
      posterImg = <img src={NotFound} alt="Not found" />;
    }

    return (
      <div className="card-house">
        <div className="card">
          <ShowIcon
            key={show.id}
            itemId={show.id}
            onItemClicked={onItemClick}
            active={activeItems}
            className="favourite-icon"
          />
          {posterImg}
          <div className="card-bottom-section">
            <h3 className="show-title">{show.original_name}</h3>
            <Link className="button" to={profileLink}>
              Learn more
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default TvShowListItem;

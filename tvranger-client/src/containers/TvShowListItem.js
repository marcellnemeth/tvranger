import React, { Component } from 'react';

import ShowIcon from '../components/ShowIcon.js';

import './TvShowListItem.css';

class TvShowListItem extends Component {
  render() {
    const { show, onItemClick, activeItems } = this.props;
    return (
      <div key={this.props.show.id} className="card-house">
        <div className="card">
          <ShowIcon
            key={show.id}
            itemId={show.id}
            onItemClicked={onItemClick}
            active={activeItems}
            className="favourite-icon"
          />
          <img src={show.img} />
          <div className="card-bottom-section">
            <h3 className="show-title">{show.title}</h3>
            <a className="button" href="#!">
              Learn More
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default TvShowListItem;

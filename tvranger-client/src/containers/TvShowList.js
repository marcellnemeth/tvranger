import React, { Component } from 'react';
import TvShowListItem from './TvShowListItem';

import './TvShowList.css';

class TvShowList extends Component {
  render() {
    const { activeItems, shows, onItemClick } = this.props;
    return (
      <div className="section">
        <div className="card-wrapper">
          {shows.map(element => {
            return (
              <TvShowListItem
                show={element}
                activeItems={activeItems}
                onItemClick={onItemClick}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default TvShowList;

import React, { Component } from 'react';
import _ from 'lodash';

import './ShowProfile.css';
import TvShowList from '../containers/TvShowList';

class ShowProfile extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { match, shows } = this.props;
    let idToFind = parseInt(match.params.id, 10);
    let foundShow = shows.find(elem => elem.id === idToFind);
    console.log(shows);
    console.log(foundShow);
    return (
      <div className="show-profile-wrapper">
        <div
          className="show-profile-background"
          style={{
            backgroundImage: `url(${
              foundShow.background_img
            }),linear-gradient(to right, #11998e, #38ef7d)`
          }}
        >
          <div className="show-profile-content">
            <div className="show-profile-details">
              <img src={foundShow.img} className="show-profile-poster" />
              <div className="show-profile-right-tab">
                <p className="show-profile-desc">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. It was popularised in the 1960s with
                  the release of Letraset sheets containing Lorem Ipsum
                  passages, and more recently with desktop publishing software
                  like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ShowProfile;

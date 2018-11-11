import React, { Component } from 'react';

import { connect } from 'react-redux';
import { fetchShowCredits } from '../action';

import './ShowProfile.css';

class ShowCredits extends Component {

  renderBottomPart() {
    const { credits } = this.props;

    if (credits) {
      return (
        <div className="sp-bottom-part">
          <div className="sp-cast">
            {credits.cast.map(member => {
              let profilePath = `https://image.tmdb.org/t/p/w185/${
                member.profile_path
              }`;
              return (
                <div className="sp-member-house" key={member.name}>
                  <div className="sp-member">
                    <img src={profilePath} className="sp-profile-img" alt="Profile poster"/>

                    <div className="sp-member-bottom">
                      <h3 className="sp-member-name">{member.name}</h3>
                      <p className="sp-member-character">{member.character}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }
  }

  componentDidMount() {
    this.props.fetchShowCredits(this.props.match.params.id);
  }
  render() {
    return (
      <div className="show-profile-wrapper">{this.renderBottomPart()}</div>
    );
  }
}

function mapStateToProps(state) {
  return {
    credits: state.credits
  };
}

export default connect(
  mapStateToProps,
  { fetchShowCredits }
)(ShowCredits);

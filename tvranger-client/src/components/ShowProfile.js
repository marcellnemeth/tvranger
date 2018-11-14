import React, { Component } from 'react';

import NotFound from '../assets/images/notfound.jpg';
import { connect } from 'react-redux';
import { fetchShowWithId, fetchShowCredits } from '../action';
import { NavLink, Route } from 'react-router-dom';

import './ShowProfile.css';
import ShowCredits from './ShowCredits';
import Comment from './Comment';

class ShowProfile extends Component {
  renderWithCondition() {
    if (!this.props.show.length == 0) {
      const show = this.props.show[0];
      let posterImg;
      let backdropPath = `https://image.tmdb.org/t/p/original/${
        show.backdrop_path
      }`;

      if (show.poster_path) {
        let posterPath = `https://image.tmdb.org/t/p/w342/${show.poster_path}`;
        posterImg = (
          <img
            src={posterPath}
            className="show-profile-poster"
            alt="Show poster"
          />
        );
      } else {
        posterImg = (
          <img src={NotFound} className="show-profile-poster" alt="Not found" />
        );
      }

      return (
        <div
          className="show-profile-background"
          style={{
            backgroundImage: `url(${backdropPath}),linear-gradient(to right, #11998e, #38ef7d)`
          }}
        >
          <div className="show-profile-content">
            <div className="show-profile-details">
              {posterImg}
              <div className="show-profile-right-tab">
                <div className="show-profile-toolbar">
                  <h2 className="sp-title">
                    {show.original_name} (
                    {show.first_air_date
                      ? show.first_air_date.substring(0, 4)
                      : 'Date not found'}
                    )
                  </h2>
                  <div className="sp-utility-tools">
                    <h1 className="rating-score">
                      {show.vote_average}
                      /10
                    </h1>
                    <div className="toolbar-icon-house">
                      <i className="fas fa-heart toolbar-icon" />
                    </div>
                    <div className="toolbar-icon-house">
                      <i className="fas fa-list toolbar-icon" />
                    </div>
                    <div className="toolbar-icon-house">
                      <i className="fas fa-star-half-alt toolbar-icon" />
                    </div>
                  </div>
                </div>
                <div className="show-profile-genres">
                  {show.genres
                    ? show.genres.map(show => {
                        return (
                          <h3 key={show.id} className="show-profile-genre">
                            {show.name}/
                          </h3>
                        );
                      })
                    : 'There is no available genre'}
                </div>
                <p className="show-profile-desc">{show.overview}</p>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return <div>Bullshit</div>;
    }
  }

  renderBottomPart() {
    const { show, credits, match, isAuthenticated} = this.props;

    if (show && credits) {
      return (
        <div>
          <div className="sp-bottom-header">
            <header className="sp-main-header">
              <ul className="sp-main-nav">
                <li>
                  <NavLink activeClassName="active" to={`${match.url}/credits`}>CAST</NavLink>
                </li>
                <li>
                  <NavLink activeClassName="active" to={`${match.url}/comments`}>COMMENTS</NavLink>
                </li>
                <li>
                  <a href="#!">Seasons</a>
                </li>
              </ul>
            </header>
          </div>
          <Route path={`${match.path}/credits`} component={ShowCredits} />
          <Route path={`${match.path}/comments`}
          render= {props => <Comment isAuthenticated={this.props.isAuthenticated} {...props}/>}/>
        </div>
      );
    }
  }

  componentWillMount() {
    this.props.fetchShowWithId(this.props.match.params.id);
    this.props.fetchShowCredits(this.props.match.params.id);
  }
  render() {
    return (
      <div className="show-profile-wrapper">
        {this.renderWithCondition()}
        {this.renderBottomPart()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    show: state.oneShow,
    credits: state.credits
  };
}

export default connect(
  mapStateToProps,
  { fetchShowWithId, fetchShowCredits }
)(ShowProfile);

import React, { Component } from 'react';
import { getWatchlist, fetchShowWatchlist, clearWatchlist } from '../action';
import { connect } from 'react-redux';
import { ScaleLoader } from 'react-spinners';
import _ from 'lodash';

import './WatchList.css';

class WatchList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shows: [],
      isLoading: false
    };
  }
  componentWillMount = () => {
    this.setState({ isLoading: true });
    this.props.getWatchlist().then(() => {
      if (this.props.watchlist) {
        console.log('whyyy');
        this.myfunction();
      }
    });
  };

  myfunction = () => {
    if (this.props.watchlist) {
      this.props.watchlist.map(e => {
        this.props.fetchShowWatchlist(e.showId).then(response => {
          this.setState({
            shows: [...this.state.shows, response.payload.data]
          });

          if (this.state.shows.length === this.props.watchlist.length) {
            let localShows = this.state.shows;
            localShows = _.orderBy(localShows, ['name'], ['asc']);

            this.setState({ shows: localShows });
            this.setState({ isLoading: false });
          }
        });
      });
    }
  };

  render() {
    if (this.state.isLoading) {
      return (
        <div className='wl-container'>
          <ScaleLoader
            className="scaleLoader"
            sizeUnit={'px'}
            size={150}
            color={'#11998e'}
            loading={this.state.isLoading}
          />
        </div>
      );
    }
    return (
      <div className="wl-container">
        {this.state.shows.map(e => {
              let posterPath = `https://image.tmdb.org/t/p/w185/${
                e.poster_path
              }`;
              return (
                <div className="wl-card-container">
                  <div className="wl-card">
                    <div className="wl-card-left-part">
                      {e.name}
                      <img src={posterPath} />
                    </div>
                    <div className="wl-card-right-part">
                      <p>{e.overview}</p>
                      <div className="wl-toolbar">
                      <a className='wl-button'>Mark as watched</a>
                      <a><i class="far fa-trash-alt wl-trash"></i></a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
         }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    watchlist: state.watchlist,
    oneShow: state.watchlistShow
  };
}

export default connect(
  mapStateToProps,
  { getWatchlist, fetchShowWatchlist, clearWatchlist }
)(WatchList);

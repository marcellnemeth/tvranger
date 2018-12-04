import React, { Component } from 'react';
import TvShowListItem from './TvShowListItem';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';
import { ScaleLoader } from 'react-spinners';
import { fetchShow, fetchPopularShows } from '../action';

import './TvShowList.css';

class TvShowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      totalPages: 0,
      isLoading: true
    };
  }

  newPage = page => {
    let intPage = parseInt(page, 10);
    this.setState({ page: intPage });
    if (this.props.shows.total_pages === 1000) {
      this.props.fetchPopularShows(intPage);
    } else {
      this.props.fetchShow(this.props.searchTerm, intPage);
    }
    console.log(this.props.shows)
  };

  componentWillReceiveProps(newProps) {
    if (newProps.shows) {
      this.setState({ isLoading: false });
    }
    
  }

  


  render() {
    const { activeItems, shows, onItemClick } = this.props;

    if (this.state.isLoading) {
      return (
        <div className="show-profile-wrapper">
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
      <div>
        <div className="results-header">
          {shows.total_results === 20000 ? (
            <h2 className="popular-title">Popular shows:</h2>
          ) : (
            <p>Total results: {shows.total_results}</p>
          )}
        </div>
        <div className="card-wrapper">
          {shows.results.map(element => {
            return (
              <TvShowListItem
                key={element.id}
                show={element}
                activeItems={activeItems}
                onItemClick={onItemClick}
              />
            );
          })}
        </div>
        <div>
          <Pagination
            interval={2}
            page={this.state.page}
            totalPage={this.props.shows ? this.props.shows.total_pages : 0}
            onPageChange={this.newPage}
          />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    shows: state.show
  };
}

export default connect(
  mapStateToProps,
  { fetchShow, fetchPopularShows }
)(TvShowList);

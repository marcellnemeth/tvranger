import React, { Component } from 'react';
import TvShowListItem from './TvShowListItem';
import { connect } from 'react-redux';
import Pagination from '../components/Pagination';

import { fetchShow } from '../action';

import './TvShowList.css';

class TvShowList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 1,
      totalPages: 0
    };
  }

  newPage = page => {
    let intPage = parseInt(page, 10);
    this.setState({ page: intPage });
    this.props.fetchShow(this.props.searchTerm, intPage);
  };

  render() {
    const { activeItems, shows, onItemClick } = this.props;
    console.log(shows);
    return (
      <div>
        <div>
          Total results: {!shows.length == 0 ? shows[0].total_results : 0}
        </div>
        <div className="card-wrapper">
          {!shows.length == 0 ? (
            shows[0].results.map(element => {
              return (
                <TvShowListItem
                  key={element.id}
                  show={element}
                  activeItems={activeItems}
                  onItemClick={onItemClick}
                />
              );
            })
          ) : (
            <h3>Loading...</h3>
          )}
        </div>
        <div>
          <Pagination
            interval={2}
            page={this.state.page}
            totalPage={
              !this.props.shows.length == 0
                ? this.props.shows[0].total_pages
                : 0
            }
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
  { fetchShow }
)(TvShowList);

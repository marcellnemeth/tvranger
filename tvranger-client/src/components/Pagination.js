import React, { Component } from 'react';
import classnames from 'classnames';

import './Pagination.css';

class Pagination extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    if (newProps === this.props) return;

    const { interval, page, totalPage } = newProps;
    const startPage = page > interval ? page - interval : 1;
    const endPage = (page + interval) > totalPage ? totalPage : (page + interval);
    
    this.setState({ startPage, endPage, totalPage });
  }

  onPagechange = event => {
    this.props.onPageChange(event.target.innerHTML);
  };

  goFirstPage = () => {
    this.props.onPageChange(1);
  };

  goLastPage = () => {
    this.props.onPageChange(this.state.totalPage);
  };

  goNextPage = () => {
    this.props.onPageChange(this.props.page + 1);
  };

  goPrevPage = () => {
    this.props.onPageChange(this.props.page - 1);
  };

  render() {
    const { startPage, endPage, totalPage } = this.state;
    const { page, interval } = this.props;

    const pages = [];

    const firstPage =
      page - interval > 1 ? (
        <button className="paging-button" onClick={this.goFirstPage}>
          1
        </button>
      ) : null;

    const lastPage =
      page + interval < totalPage ? (
        <button className="paging-button go-last" onClick={this.goLastPage}>
          {totalPage}
        </button>
      ) : null;

    const nextPage =
      page === totalPage ? null : (
        <button className="paging-button" onClick={this.goNextPage}>
          next
        </button>
      );

    const prevPage =
      page === 1 ? null : (
        <button className="paging-button" onClick={this.goPrevPage}>
          prev
        </button>
      );

    for (let i = startPage; i <= endPage; i++) {
        console.log();
      pages.push(
        <button className={classnames("paging-button",{active: i === this.props.page})} key={i} onClick={this.onPagechange}>
          {i}
        </button>
      );
    }
    return (
      <div className="paging">
        {prevPage}
        {firstPage}
        {pages}
        {lastPage}
        {nextPage}
      </div>
    );
  }
}

export default Pagination;

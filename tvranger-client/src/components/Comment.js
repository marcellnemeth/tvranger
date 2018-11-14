import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link, Route } from 'react-router-dom';
import CreateComment from './CreateComment';

import { fetchCommentsByShowId } from '../action';

import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.fetchCommentsByShowId(this.props.match.params.id);
  }

  componentDidUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchCommentsByShowId(this.props.match.params.id);
    }
  }

  render() {
    return (
      <div className="comment-container">
        <div>
          {this.props.comments.length
            ? this.props.comments.map(comment => {
                return (
                  <div className="comment">
                    <h5 className="comment-author">
                      @{comment.createdBy} at{' '}
                      <span className="comment-created-date">
                        {comment.createdAt}
                      </span>
                    </h5>
                    <p className="comment-message">{comment.message}</p>
                    <h3>{}</h3>
                  </div>
                );
              })
            : ''}
          {this.props.isAuthenticated ? (
            <Link to={`${this.props.match.url}/create`}>Write a comment</Link>
          ) : (
            ''
          )}
        </div>
        <Route
          path={`${this.props.match.path}/create`}
          render={props => (
            <CreateComment prevPath={this.props.match.url} {...props} />
          )}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    comments: state.comments
  };
}

export default connect(
  mapStateToProps,
  { fetchCommentsByShowId }
)(Comment);

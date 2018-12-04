import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Route } from 'react-router-dom';
import CreateComment from './CreateComment';

import { fetchCommentsByShowId } from '../action';

import './Comment.css';

class Comment extends Component {
  constructor(props) {
    super(props);
    console.log('method run');
  }

  /* componentDidUpdate(nextProps) {
    if (nextProps.location.pathname !== this.props.location.pathname) {
      this.props.fetchCommentsByShowId(this.props.match.params.id);
      console.log("compon")
    }
  }*/

  componentDidMount() {
    this.props.fetchCommentsByShowId(this.props.match.params.id);
  }

  render() {
    const { match, comments } = this.props;

    return (
      <div className="comment-container">
        <div>
          {comments.length
            ? comments.map(comment => {
                return (
                  <div className="comment" key={comment.id}>
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
            <Link to={`${match.url}/create`}>Write a comment</Link>
          ) : (
            ''
          )}
        </div>
        <Route
          path={`${match.path}/create`}
          render={props => <CreateComment prevPath={match.url} {...props} />}
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { fetchCommentsByShowId: fetchCommentsByShowId },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);

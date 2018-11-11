import React, {Component} from 'react';

import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';
import CreateComment from './CreateComment';

import {fetchCommentsByShowId} from "../action";

import "./Comment.css";

class Comment extends Component {
    componentDidMount(){
        this.props.fetchCommentsByShowId(this.props.match.params.id)
    }
    render(){
        console.log(this.props.comments)
        return(
            <div className="comment">
            <div>
               <h3>{!this.props.comments.length == 0?this.props.comments[0].id:null}</h3>
               <h3>{!this.props.comments.length == 0?this.props.comments[0].message:null}</h3>
               <h3>{!this.props.comments.length == 0?this.props.comments[0].createdAt:null}</h3>

               <Link to={`${this.props.match.url}/create`}>Write a comment</Link>
            </div>
            <Route path={`${this.props.match.path}/create`} component={CreateComment} />
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        comments: state.comments
    }
}

export default connect(mapStateToProps,{fetchCommentsByShowId})(Comment);
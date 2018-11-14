import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';

import './CreateComment.css';

class CreateComment extends Component {
  handleFormSubmit = values => {
    var object = {
      message: values.message,
      showId: parseInt(this.props.match.params.id, 10)
    };

    console.log(object);

    axios
      .post('http://localhost:5000/api/comment', object, {
        headers: {
          Authorization: localStorage.getItem('accessToken')
            ? 'Bearer ' + localStorage.getItem('accessToken')
            : null
        }
      })
      .then(response => {
        this.props.history.push(this.props.prevPath);
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          alert('You are not authorized');
        } else {
          console.log(error);
        }
      });
  };
  render() {
    const { handleSubmit } = this.props;
    console.log(this.props.prevPath);
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit)}>
        <Field
          type="text"
          classname="comment-input"
          name="message"
          component={renderField}
        />
        <button type="submit" className="comment-button">
          Send
        </button>
      </form>
    );
  }
}

const renderField = ({
  input,
  label,
  type,
  classname,
  meta: { touched, error, warning }
}) => (
  <div>
    <div>
      <textarea
        {...input}
        type={type}
        className={classname + `${touched && error ? ' has-danger' : ''}`}
      />
      {touched &&
        ((error && <div className="user-input-error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.message) {
    errors.message = 'Required';
  }
  return errors;
};

export default reduxForm({
  form: 'loginForm',
  validate
})(connect(null)(CreateComment));

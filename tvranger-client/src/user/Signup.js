import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import './User.css';

class Signup extends Component {
  
  handleFormSubmit = values => {
    axios
      .post('http://localhost:5000/api/auth/signup', Object.assign({}, values))
      .then(() => {
        this.props.onSignup();
      })
      .catch(function(error) {
        alert(error.response);
      });
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="user-container"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <div className="user-card">
          <h2 className="user-title">Sign Up</h2>

          <Field
            type="text"
            name="username"
            classname="user-input"
            label="Username"
            component={renderField}
          />

          <Field
            type="email"
            name="email"
            classname="user-input"
            label="Email"
            component={renderField}
          />

          <Field
            type="password"
            name="password"
            classname="user-input"
            label="Password"
            component={renderField}
          />
          <button type="submit" className="user-button">
            Sign Up
          </button>
          <p>
            Already registered?&nbsp;
            <Link to="/login" className="login-link">
              Log In
            </Link>
          </p>
        </div>
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
    <label>{label}</label>
    <div>
      <div className="user-input-container">
        <input
          {...input}
          placeholder={label}
          type={type}
          className={classname + `${touched && error ? ' has-danger' : ''}`}
        />
        {touched && (!error && <i className="fas fa-check success-icon" />)}
        {touched && (error && <i className="fas fa-times error-icon" />)}
      </div>
      {touched &&
        ((error && <div className="user-input-error">{error}</div>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
);

const validate = values => {
  const errors = {};
  if (!values.username) {
    errors.username = 'Required';
  } else if (values.username.length > 20) {
    errors.username = 'Must be 20 characters or less';
  }
  if (!values.email) {
    errors.email = 'Required';
  } else if (
    !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      values.email
    )
  ) {
    errors.email = 'Provide valid email';
  } else if (values.email.length > 50) {
    errors.email = 'Must be 20 characters or less';
  }
  if (!values.password) {
    errors.password = 'Required';
  } else if (values.password.length < 6) {
    errors.password = 'Your password should be 6 or more characters';
  } else if (values.password.length > 80) {
    errors.password = 'Must be 80 characters or less';
  }
  return errors;
};

export default reduxForm({
  form: 'signupForm',
  validate
})(connect(null)(Signup));

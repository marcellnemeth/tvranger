import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import axios from 'axios';

import './User.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(values) {
    axios
      .post('http://localhost:5000/api/auth/login', Object.assign({}, values))
      .then(response => {
        localStorage.setItem('accessToken', response.data.accessToken);
        this.props.onLogin();
      })
      .catch(function(error) {
        alert(error.response);
      });
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="user-container"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <div className="user-card">
          <h2 className="user-title">Login</h2>
          <Field
            name="emailOrUsername"
            type="text"
            classname="user-input"
            label="Username"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            classname="user-input"
            label="Password"
            component={renderField}
          />
          <button type="submit" className="user-button">
            Login
          </button>
          <p>
            New user? &nbsp;
            <Link to="/signup" className="signup-link">
              Sign Up
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
  if (!values.emailOrUsername) {
    errors.emailOrUsername = 'Required';
  } else if (values.emailOrUsername.length > 20) {
    errors.username = 'Must be 20 characters or less';
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
  form: 'loginForm',
  validate
})(connect(null)(Login));

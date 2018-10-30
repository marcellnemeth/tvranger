import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import axios from 'axios';

import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  handleFormSubmit(values) {
    axios
      .post('http://localhost:5000/api/auth/login', Object.assign({}, values))
      .then(response => {
        console.log(response);
        localStorage.setItem('accessToken', response.data.accessToken);
      })
      .catch(function(error) {
        if (error.response.status === 401) {
          alert('You are not authorized');
        } else {
          console.log(error);
        }
      });
    console.log(values);
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form
        className="login-container"
        onSubmit={handleSubmit(this.handleFormSubmit)}
      >
        <div className="login-card">
          <h2 className="login-title">Login</h2>
          <Field
            name="emailOrUsername"
            type="text"
            classname="login-input"
            label="Username"
            component={renderField}
          />
          <Field
            name="password"
            type="password"
            classname="login-input"
            label="Password"
            component={renderField}
          />
          <button type="submit" className="login-button">
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
      <div className="login-input-container">
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
        ((error && <div className="login-input-error">{error}</div>) ||
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

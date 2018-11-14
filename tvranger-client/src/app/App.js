import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import Banner from '../components/Banner';
import TvShowList from '../containers/TvShowList';
import Login from '../user/Login';
import Signup from '../user/Signup';
import ShowProfile from '../components/ShowProfile';
import { ScaleLoader } from 'react-spinners';

import _ from 'lodash';

import { connect } from 'react-redux';

import '../app/App.css';
import { fetchShow, getCurrentUser } from '../action';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItems: [],
      term: '',
      currentUser: null,
      isAuthenticated: false,
      isLoading: false
    };
    this.onItemClick = this.onItemClick.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
    this.loadCurrentUser = this.loadCurrentUser.bind(this);
  }

  onItemClick(itemId) {
    if (!this.state.activeItems.includes(itemId)) {
      this.setState({ activeItems: this.state.activeItems.concat(itemId) });
    }
    if (this.state.activeItems.includes(itemId)) {
      let index = this.state.activeItems.indexOf(itemId);

      this.setState({
        activeItems: [
          ...this.state.activeItems.slice(0, index),
          ...this.state.activeItems.slice(index + 1)
        ]
      });
    }
  }

  componentDidMount() {
    this.loadCurrentUser();
  }
  loadCurrentUser() {
    this.setState({ isLoading: true });
    this.props
      .getCurrentUser()
      .then(response => {
        this.setState({
          currentUser: response.payload.data,
          isLoading: false,
          isAuthenticated: true
        });
      })
      .catch(error => {
        this.setState({
          isLoading: false
        });
      });

    console.log(this.state.currentUser);
  }

  handleLogin() {
    this.loadCurrentUser();

    this.props.history.push('/');
  }
  handleLogout() {
    localStorage.removeItem('accessToken');

    this.setState({
      currentUser: null,
      isAuthenticated: false
    });
    this.props.history.push('/');
  }

  handleSignup() {
    this.props.history.push('login');
  }
  render() {
    const { activeItems } = this.state;

    const imitateSearch = _.debounce(term => {
      this.props.fetchShow(term, 1);
      this.setState({ term: term });
    }, 500);
    if (this.state.isLoading) {
      return (
        <div>
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
      <div className="wrapper">
        <AppHeader
          isAuthenticated={this.state.isAuthenticated}
          currentUser={this.state.currentUser}
          onLogout={this.handleLogout}
        />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div className="banner-showlist-container">
                <Banner onSearchTermChange={imitateSearch} />
                <div className="section">
                  <TvShowList
                    activeItems={activeItems}
                    onItemClick={this.onItemClick}
                    searchTerm={this.state.term}
                    {...props}
                  />
                </div>
              </div>
            )}
          />
          <Route
            path="/show/profile/:id"
            render={props => (
              <ShowProfile
                isAuthenticated={this.state.isAuthenticated}
                {...props}
              />
            )}
          />
          <Route
            path="/login"
            render={props => <Login onLogin={this.handleLogin} {...props} />}
          />
          <Route
            path="/signup"
            render={props => <Signup onSignup={this.handleSignup} {...props} />}
          />
        </Switch>
        <AppFooter />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentUser: state.currentUser
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    { fetchShow, getCurrentUser }
  )(App)
);

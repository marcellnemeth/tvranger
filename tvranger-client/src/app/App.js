import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import AppFooter from '../components/AppFooter';
import Banner from '../components/Banner';
import TvShowList from '../containers/TvShowList';
import Login from '../user/Login';
import Signup from '../user/Signup';

import '../app/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItems: [],
      shows: [
        {
          id: 1,
          title: 'The 100',
          img: 'https://image.tmdb.org/t/p/w342/wHIMMLFsk32wIzDmawWkYVbxFCS.jpg'
        },
        {
          id: 2,
          title: 'Stranger things',
          img: 'https://image.tmdb.org/t/p/w500/lXS60geme1LlEob5Wgvj3KilClA.jpg'
        },
        {
          id: 3,
          title: 'The 100',
          img: 'https://image.tmdb.org/t/p/w342/wHIMMLFsk32wIzDmawWkYVbxFCS.jpg'
        },
        {
          id: 4,
          title: 'Stranger things',
          img: 'https://image.tmdb.org/t/p/w342/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg'
        },
        {
          id: 5,
          title: 'The 100',
          img: 'https://image.tmdb.org/t/p/w342/wHIMMLFsk32wIzDmawWkYVbxFCS.jpg'
        },
        {
          id: 6,
          title: 'Stranger things',
          img:
            'https://image.tmdb.org/t/p/w342//lXS60geme1LlEob5Wgvj3KilClA.jpg'
        },
        {
          id: 7,
          title: 'The 100',
          img: 'https://image.tmdb.org/t/p/w342/ooBGRQBdbGzBxAVfExiO8r7kloA.jpg'
        },
        {
          id: 8,
          title: 'Stranger things',
          img:
            'https://image.tmdb.org/t/p/w342//lXS60geme1LlEob5Wgvj3KilClA.jpg'
        }
      ]
    };
    this.onItemClick = this.onItemClick.bind(this);
  }

  onItemClick(itemId) {
    if (!this.state.activeItems.includes(itemId)) {
      this.setState({ activeItems: this.state.activeItems.concat(itemId) });
    }
    if (this.state.activeItems.includes(itemId)) {
      console.log('item id:' + itemId + 'items' + this.state.activeItems);
      let index = this.state.activeItems.indexOf(itemId);

      this.setState({
        activeItems: [
          ...this.state.activeItems.slice(0, index),
          ...this.state.activeItems.slice(index + 1)
        ]
      });
      console.log(this.state.activeItems);
    }
  }

  render() {
    const { activeItems, shows } = this.state;
    console.log(activeItems);
    return (
      <div className="wrapper">
        <AppHeader />
        <Switch>
          <Route
            exact
            path="/"
            render={props => (
              <div>
                <Banner />
                <TvShowList
                  activeItems={activeItems}
                  onItemClick={this.onItemClick}
                  shows={shows}
                  {...props}
                />
              </div>
            )}
          />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
        </Switch>
        <AppFooter />
      </div>
    );
  }
}

export default withRouter(App);

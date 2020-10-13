import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import fire from 'firebase';

import Aux from './hoc/Aux/Aux';
import Layout from './hoc/Layout/Layout';
import HoursCreation from './Containers/HoursCreation/HoursCreation';
import UsersFeed from './Containers/UsersFeed/UsersFeed';
import LoginPage from './Containers/Login/LoginPage';
import TeamCreation from './Containers/TeamCreation/TeamCreation';
import Profile from './Containers/Profile/Profile';

import './App.css';

class App extends Component {
  state = {
      togglePanel: false,
      isLogged: false
  }

  togglePanelHandler = () => {
      this.setState(prevState => ({togglePanel: !prevState.togglePanel}));
  }
  
  componentWillMount() {
    this.authListener();
  }

  authListener = () => {
    fire.auth().onAuthStateChanged(logged => {
      this.setState({ isLogged: logged});
    })
  }

  render() {
    let routes = null;
    if (!this.state.isLogged) {
      routes = (
        <Switch>
            <Route path="/login" component={LoginPage} />
        </Switch>
      );
    }

    if (this.state.isLogged) {
      routes = (
          <Switch>
            <Route path="/users-feed" component={UsersFeed} />
            <Route path="/teams" component={TeamCreation} />
            <Route path="/profile" component={Profile} />
            <Route path="/" exact render={
              () => (
                <HoursCreation
                  hidePanel={this.state.togglePanel}
                  togglePanel={this.togglePanelHandler} />
              )
            } />
            <Route path="*">Not match</Route>
          </Switch>
      )
    }
    return (
      <Aux>
        <Layout
          showMenu={this.state.isLogged}>
          {routes}
        </Layout>
      </Aux>
    );
  }
}

export default withRouter(App);

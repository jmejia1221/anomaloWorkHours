import React, { Component } from 'react';
import { Redirect, Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from './hoc/Aux/Aux';
import Layout from './hoc/Layout/Layout';
import HoursCreation from './Containers/HoursCreation/HoursCreation';
import UsersFeed from './Containers/UsersFeed/UsersFeed';
import LoginPage from './Containers/Login/LoginPage';
import TeamCreation from './Containers/TeamCreation/TeamCreation';
import Profile from './Containers/Profile/Profile';

import * as actions from './store/actions';

import './App.css';

class App extends Component {
  state = {
      togglePanel: false,
      isLogged: false
  }

  togglePanelHandler = () => {
    this.setState(prevState => ({togglePanel: !prevState.togglePanel}));
  }
  
  componentDidMount() {
    this.props.onTryLogin()
  }

  render() {
    let routes = null;
    if (!this.props.isAuthenticated) {
      routes = (
        <Switch>
            <Route exact path="/" component={LoginPage} />
            <Redirect from="/login" to='/' />
        </Switch>
      );
    }

    if (this.props.isAuthenticated) {
      routes = (
          <Switch>
            <Route path="/teams/:id" component={UsersFeed} />
            <Route path="/teams" component={TeamCreation} />
            <Route path="/profile" component={Profile} />
            <Route path="/" exact render={
              () => (
                <HoursCreation
                  hidePanel={this.state.togglePanel}
                  togglePanel={this.togglePanelHandler} />
              )
            } />
            <Redirect from="/" to='/' />
          </Switch>
      )
    }
    return (
      <Aux>
        <Layout
          showMenu={this.props.isAuthenticated}>
          {routes}
        </Layout>
      </Aux>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryLogin: () => dispatch(actions.checkAuthState())
  };
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

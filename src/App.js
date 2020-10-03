import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

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
      isLoged: true
  }

  togglePanelHandler = () => {
      this.setState(prevState => ({togglePanel: !prevState.togglePanel}));
  }

  render() {
    return (
      <Aux>
        <Layout
          showMenu={this.state.isLoged}>
          <Switch>
            <Route path="/hours" render={
              () => (
                <HoursCreation
                  hidePanel={this.state.togglePanel}
                  togglePanel={this.togglePanelHandler} />
              )
            } />
            <Route path="/users-feed" component={UsersFeed} />
            <Route path="/login" component={LoginPage} />
            <Route path="/teams" component={TeamCreation} />
            <Route path="/profile" component={Profile} />
          </Switch>
        </Layout>
      </Aux>
    );
  }
}

export default App;

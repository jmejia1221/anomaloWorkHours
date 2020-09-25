import React, { Component } from 'react';
import Aux from './hoc/Aux/Aux';
import Layout from './hoc/Layout/Layout';
import HoursCreation from './Containers/HoursCreation/HoursCreation';
import UsersFeed from './Containers/UsersFeed/UsersFeed';
import Login from './Containers/Login/Login';
import './App.css';

class App extends Component {
  state = {
      togglePanel: false,
      isLogin: false
  }

  togglePanelHandler = () => {
      this.setState(prevState => ({togglePanel: !prevState.togglePanel}));
  }

  render() {
    return (
      <Aux>
        <Layout
          showMenu={this.state.isLogin}>
          {/* <HoursCreation
            hidePanel={this.state.togglePanel}
            togglePanel={this.togglePanelHandler} /> */}
          {/* <UsersFeed /> */}
          <Login />
        </Layout>
      </Aux>
    );
  }
}

export default App;

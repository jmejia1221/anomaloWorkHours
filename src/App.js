import React from 'react';
import Aux from './hoc/Aux/Aux';
import Layout from './hoc/Layout/Layout';
import HoursCreation from './Containers/HoursCreation/HoursCreation';
import UsersFeed from './Containers/UsersFeed/UsersFeed';
import './App.css';

function App() {
  return (
    <Aux>
      <Layout>
        <HoursCreation />
        {/* <UsersFeed /> */}
      </Layout>
    </Aux>
  );
}

export default App;

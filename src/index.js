import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import hoursCreationReducer from './store/reducers/hoursCreation';
import authReducer from './store/reducers/auth';
import teamCreationReducer from './store/reducers/teamCreation';
import usersReducer from './store/reducers/users';

const composeEnhancers = process.env.NODE_ENV === 'development' ? 
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose :
  null;

const rootReducer = combineReducers({
  auth: authReducer,
  hoursCreation: hoursCreationReducer,
  teamCreation: teamCreationReducer,
  users: usersReducer
});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

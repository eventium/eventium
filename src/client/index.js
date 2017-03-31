import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import AppRoutes from './../common/components/AppRoutes';
import eventiumApp from './../common/reducers';

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__INITIAL_STATE__;

// Allow the passed state to be garbage-collected
delete window.__INITIAL_STATE__;

// Create Redux store with initial state
const store = createStore(eventiumApp, preloadedState, compose(applyMiddleware(thunkMiddleware)));
const rootElement = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <AppRoutes />
  </Provider>,
  rootElement,
);

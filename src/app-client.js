import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import eventiumApp from './reducers'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(eventiumApp, preloadedState)

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRoutes/>
    </Provider>, document.getElementById('main'));
};

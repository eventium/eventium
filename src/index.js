import React from 'react';
import ReactDOM from 'react-dom';
import AppRoutes from './components/AppRoutes';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import eventiumApp from './reducers'
import thunkMiddleware from 'redux-thunk'

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

// Create Redux store with initial state
const store = createStore(eventiumApp, preloadedState, compose(applyMiddleware(thunkMiddleware)))

window.onload = () => {
  ReactDOM.render(
    <Provider store={store}>
      <AppRoutes/>
    </Provider>, document.getElementById('root'));
};

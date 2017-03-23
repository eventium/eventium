// Credits: https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import IndexPage from './components/IndexPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={IndexPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;

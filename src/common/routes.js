// Credits: https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import EventListPage from './containers/EventListPage';
import EventPage from './containers/EventPage';
import ChatPage from './containers/ChatPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={EventListPage}/>
      <Route path="/events/:id" component={EventPage}/>
        <Route path="/events/:id/chat" component={ChatPage}/>
    <Route path="*" component={NotFoundPage}/>
  </Route>
);

export default routes;

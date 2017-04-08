// Credits: https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app
import React, { PropTypes } from 'react'
import { Provider } from 'react-redux';
import { Route, IndexRoute } from 'react-router'
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import EventListPage from './containers/EventListPage';
import EventPage from './containers/EventPage';
import ChatPage from './containers/ChatPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import CreateEventPage from './containers/CreateEventPage';
import UpdateEventPage from './containers/UpdateEventPage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={EventListPage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="events" component={Layout}>
      <Route path="create" component={CreateEventPage} />
      <Route path=":id" component={Layout}>
        <IndexRoute component={EventPage} />
        <Route path="chat" component={ChatPage} />
        <Route path="update" component={UpdateEventPage} />
      </Route>
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;

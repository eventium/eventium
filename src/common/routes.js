// Credits: https://scotch.io/tutorials/react-on-the-server-for-beginners-build-a-universal-react-and-node-app
import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Layout from './components/Layout';
import NotFoundPage from './components/NotFoundPage';
import EventListPage from './containers/EventListPage';
import EventPage from './containers/EventPage';
import ChatPage from './containers/ChatPage';
import LoginPage from './containers/LoginPage';
import SignupPage from './containers/SignupPage';
import CreateEventPage from './containers/CreateEventPage';
import UpdateEventPage from './containers/UpdateEventPage';
import MembersPage from './containers/MembersPage';
import ProfilePage from './containers/ProfilePage';
import UpdateProfilePage from './containers/UpdateProfilePage';

const routes = (
  <Route path="/" component={Layout}>
    <IndexRoute component={EventListPage} />
    <Route path="login" component={LoginPage} />
    <Route path="signup" component={SignupPage} />
    <Route path="events">
      <Route path="create" component={CreateEventPage} />
      <Route path=":id">
        <IndexRoute component={EventPage} />
        <Route path="chat" component={ChatPage} />
        <Route path="members" component={MembersPage} />
        <Route path="update" component={UpdateEventPage} />
      </Route>
    </Route>
    <Route path="profile/:id" component={Layout}>
      <IndexRoute component={ProfilePage} />
      <Route path="update" component={UpdateProfilePage} />
    </Route>
    <Route path="*" component={NotFoundPage} />
  </Route>
);

export default routes;

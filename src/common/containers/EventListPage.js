import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadUserEvents, loadUserInvites, deleteUserInvite, createUserMembership, deleteUserMembership } from '../actions/users';
import { redirectToLogin } from '../actions/session';
import EventList from '../components/EventList';
import InviteList from '../components/InviteList';
import GeneralNavBar from '../components/GeneralNavBar';

class EventListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const session = this.props.session;
    if (!session.user) {
      dispatch(redirectToLogin(this.context.router));
      return;
    }
    this.acceptInvite = this.acceptInvite.bind(this);
    this.declineInvite = this.declineInvite.bind(this);
    this.leaveEvent = this.leaveEvent.bind(this);
    dispatch(loadUserEvents(session.user.id));
    dispatch(loadUserInvites(session.user.id));
  }

  acceptInvite(inviteId) {
    const { dispatch, session, invites } = this.props;
    const invite = invites.find(inviteObj => (inviteObj.id === inviteId));
    if (invite) {
      dispatch(createUserMembership(session.user.id, invite));
    }
  }

  declineInvite(inviteId) {
    const { dispatch, session } = this.props;
    dispatch(deleteUserInvite(session.user.id, inviteId));
  }

  leaveEvent(eventId) {
    const { dispatch, session } = this.props;
    dispatch(deleteUserMembership(session.user.id, eventId));
  }

  render() {
    const { events, invites, session } = this.props;

    let noEventsMessage;

    if (this.props.events.length === 0) {
      noEventsMessage = (
        <div className="alert alert-info">
          <p>Looks like you don&#39;t have any events. Why not create one?</p>
          <br />
          <Link to="/events/create/" className="btn btn-primary">Create Event</Link>
        </div>
      );
    } else {
      noEventsMessage = '';
    }

    return (
      <div>
        <GeneralNavBar session={session} />
        <div className="container event-list-page-wrapper">
          <h1>Your Events</h1>
          { noEventsMessage }
          <InviteList
            invites={invites}
            acceptInvite={this.acceptInvite}
            declineInvite={this.declineInvite}
          />
          <EventList events={events} leaveEvent={this.leaveEvent} />
        </div>
        <div className="create-event">
          <Link to="/events/create/">
            <span className="glyphicon glyphicon-plus" />
          </Link>
        </div>
      </div>
    );
  }
}

EventListPage.propTypes = {
  invites: PropTypes.array.isRequired,
  events: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

EventListPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    invites: state.invites.data,
    events: state.events.data,
    session: state.session,
  };
};

export default connect(mapStateToProps)(EventListPage);

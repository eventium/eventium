import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadEventMembers, loadEventInvites, createEventInvite } from '../actions/events';
import { redirectToLogin } from '../actions/session';
import NavBar from '../components/NavBar';
import EventInviteList from '../components/EventInviteList';
import EventMembersList from '../components/EventMembersList';
import EventInviteMemberForm from '../components/EventInviteMemberForm';
import EventAlert from '../components/EventAlert';

class MembersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch, session } = this.props;
    if (!session.user) {
      dispatch(redirectToLogin(this.context.router, this.props.location.pathname));
      return;
    }
    const eventId = this.props.params.id;
    this.inviteUserToEvent = this.inviteUserToEvent.bind(this);
    dispatch(loadEventMembers(eventId));
    dispatch(loadEventInvites(eventId));
  }

  inviteUserToEvent(user) {
    const { dispatch, session } = this.props;
    const eventId = this.props.params.id;
    dispatch(createEventInvite(eventId, user.id, session.user.id));
  }

  render() {
    const { invites, members, userExists } = this.props;
    const eventId = this.props.params.id;
    return (
      <div>
        <NavBar eventId={eventId} />
        <div className="container event-membership-page-wrapper">
          <EventAlert userExists={userExists} />
          <EventInviteMemberForm inviteUserToEvent={this.inviteUserToEvent} />
          <h2>{invites.length > 0 ? 'Invitees' : ''}</h2>
          <EventInviteList invites={invites} />
          <h2>{members.length > 0 ? 'Attendees' : ''}</h2>
          <EventMembersList members={members} />
        </div>
      </div>
    );
  }
}

MembersPage.propTypes = {
  invites: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  userExists: PropTypes.bool.isRequired,
};

MembersPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {

  return {
    invites: state.members.invites,
    members: state.members.members,
    session: state.session,
    userExists: state.user.userExists,
  };
};

export default connect(mapStateToProps)(MembersPage);

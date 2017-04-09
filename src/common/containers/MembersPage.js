import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadEventMembers, loadEventInvites } from '../actions/events';
import { redirectToLogin } from '../actions/session';
import NavBar from '../components/NavBar';
import EventInviteList from '../components/EventInviteList';
import EventMembersList from '../components/EventMembersList';

class MembersPage extends Component {
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
    const eventId = this.props.params.id;
    dispatch(loadEventMembers(eventId));
    dispatch(loadEventInvites(eventId));
  }

  render() {
    const { session, dispatch, invites, members } = this.props;
    const eventId = this.props.params.id;
    return (
      <div>
        <NavBar eventId={eventId} />
        <div className="event-membership-page-wrapper">
          <EventInviteList invites={invites} />
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
};

MembersPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    invites: state.invites.data,
    members: state.members.data,
    session: state.session,
  };
};

export default connect(mapStateToProps)(MembersPage);

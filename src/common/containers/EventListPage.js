
import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { redirectToLogin } from '../actions/session';
import { loadEvents } from '../actions/events';
import { loadInvites } from '../actions/invites';
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

    dispatch(loadEvents());
    dispatch(loadInvites());
  }

  render() {
    const { events, invites, session } = this.props;
    return (
      <div>
        <GeneralNavBar session={session} />
        <div className="event-list-page-wrapper">
          <InviteList invites={invites} />
          <EventList events={events} />
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
    events: state.events,
    session: state.session,
  };
};

export default connect(mapStateToProps)(EventListPage);

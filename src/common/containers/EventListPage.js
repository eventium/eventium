import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { loadEvents } from '../actions/events';
import EventList from '../components/EventList';
import GeneralNavBar from '../components/GeneralNavBar';

class EventListPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const session = this.props.session;
    if (!session.user) {
      this.context.router.push('/login');
      return;
    }
    const { dispatch } = this.props;
    dispatch(loadEvents());
  }

  render() {
    const { events, session } = this.props;
    return (
      <div>
        <GeneralNavBar session={session} />
        <span className="page-header">
          <h1>Your events</h1>
        </span>
        <EventList events={events} />
      </div>
    );
  }
}

EventListPage.propTypes = {
  events: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};
EventListPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    events: state.events,
    session: state.session,
  };
};

export default connect(mapStateToProps)(EventListPage);

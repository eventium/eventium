import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { redirectToLogin } from '../actions/session';
import { loadEvents } from '../actions/events'
import EventList from '../components/EventList'

class EventListPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    const session = this.props.session;
    if (!session.user) {
      dispatch(redirectToLogin(this.context.router));
      return;
    }
    dispatch(loadEvents())
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        <span className='page-header'>
          <h1>Your events</h1>
        </span>
        <EventList events={events} />
      </div>
    )
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
  }
}

export default connect(mapStateToProps)(EventListPage)

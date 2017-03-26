import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { loadEvents } from '../actions/events'
import EventList from '../components/EventList'

class EventListPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(loadEvents())
  }

  render() {
    const { events } = this.props;
    return (
      <div>
        <EventList events={events}/>
      </div>
    )
  }
}

EventListPage.propTypes = {
  events: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => {
  return {
    events: state.events
  }
}

export default connect(mapStateToProps)(EventListPage)

import React, { Component, PropTypes } from 'react';
import Event from './Event';

export default class EventList extends Component {
  render() {
    const { events, leaveEvent } = this.props;

    return (
      <ul className={'list-group'}>
        {events.map(event =>
          <Event
            key={event.id}
            {...event}
            leaveEvent={leaveEvent}
          />,
        )}
      </ul>
    );
  }
}

EventList.propTypes = {
  events: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  leaveEvent: PropTypes.func.isRequired,
};

import React, { Component, PropTypes } from 'react';
import Event from './Event';

export default class EventList extends Component {
  render() {
    const { events } = this.props;

    return (
      <ul className={'list-group'}>
        {events.map(event =>
          <Event
            key={event.id}
            {...event}
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
};

import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class Invite extends Component {
  render() {
    const { id, Event } = this.props;
    return (
      <li className="list-group-item">
        <div className="list-item-title">
          {Event.title}
        </div>
        <div className="list-item-subtitle">
          {`On ${moment(Event.start_time).format('LLL')}`}
        </div>
        <div className="list-item-subtitle">
          @{Event.location}
        </div>
      </li>
    );
  }
}

Invite.PropTypes = {
  id: PropTypes.number.isRequired,
  Event: PropTypes.PropTypes.shape({
    title: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
};

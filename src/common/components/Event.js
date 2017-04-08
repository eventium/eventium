import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import moment from 'moment';

export default class Event extends Component {
  render() {
    const { id, title, start_time, location } = this.props;
    return (
      <li className="list-group-item">
        <Link key={id} to={`/events/${id}`} >
          <div className="list-item-title">
            {title}
          </div>
        </Link>
        <div className="list-item-subtitle">
          {`On ${moment(start_time).format('LLL')}`}
        </div>
        <div className="list-item-subtitle">
          @{location}
        </div>
      </li>
    );
  }
}

Event.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start_time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
};

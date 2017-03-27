import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class Event extends Component {
  render() {
    const { id, title, location } = this.props
    const start_time = new Date(this.props.start_time);
    return (
      <li className='list-group-item'>
        <Link key={id} to={`/events/${id}`} >
          <div className='list-item-title'>
            {title}
          </div>
          <div>
            <div className='list-item-subtitle'>
              {'Starts: ' +
               start_time.toLocaleDateString() + ' ' +
               start_time.toLocaleTimeString()}
            </div>
            <div className='list-item-subtitle'>
              {location}
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

Event.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}

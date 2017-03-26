import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class Event extends Component {
  render() {
    const { id, title, time, location} = this.props
    const date = new Date(time);
    return (
      <li className='list-group-item'>
        <Link key={id} to={`/events/${id}`} >
          <div className='list-item-title'>
            {title}
          </div>
          <div>
            <div>
              <span className='list-item-subtitle'>{date.toLocaleDateString()}</span>
              <span className='list-item-subtitle'>{date.toLocaleTimeString()}</span>
            </div>
            <div>
              <span className='list-item-subtitle'>{location.address}</span>
              <span className='list-item-subtitle'>{location.postal}</span>
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

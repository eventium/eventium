import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class Event extends Component {
  render() {
    const { id, title} = this.props

    return (
      <li className='list-group-item'>
        <Link key={id} to={`/events/${id}`} >
          <div className='list-item-title'>
            {title}
          </div>
          <div>
            <span className='list-item-subtitle'>Date</span>
            <span className='list-item-subtitle'>Location</span>
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

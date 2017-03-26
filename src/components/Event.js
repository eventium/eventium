import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router';

export default class Event extends Component {
  render() {
    const { id, title } = this.props

    return (
      <li>
        <Link key={id} to={`/events/${id}`}>
          {title}
        </Link>
      </li>
    )
  }
}

Event.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired
}


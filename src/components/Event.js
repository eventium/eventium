import React, { Component, PropTypes } from 'react'

export default class Event extends Component {
  render() {
    const { title } = this.props

    return (
      <li>{title}</li>
    )
  }
}

Event.PropTypes = {
  title: PropTypes.string.isRequired
}


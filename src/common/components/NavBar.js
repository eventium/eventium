import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {


  render() {
    const eventId = this.props.eventId;
    return (
      <div className="navbar-wrapper">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/"><span className="glyphicon glyphicon-globe" /></Link>
          </li>
          <li className="menu-item">
            <Link to={`/events/${eventId}/`}><span className="glyphicon glyphicon-th-list" /></Link>
          </li>
          <li className="menu-item">
            <Link to={`/events/${eventId}/members/`}><span className="glyphicon glyphicon-user" /></Link>
          </li>
          <li className="menu-item">
            <Link to={`/events/${eventId}/chat/`}><span className="glyphicon glyphicon-comment" /></Link>
          </li>
        </ul>
      </div>
    );
  }
}

NavBar.propTypes = {
  eventId: PropTypes.string.isRequired,
};

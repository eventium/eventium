import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

export default class NavBar extends Component {


  render() {
    const eventId = this.props.eventId;
    return (
      <div className="navbar-wrapper">
        <ul>
          <li>
            <Link to="/"><span className="glyphicon glyphicon-globe" /></Link>
          </li>
          <li>
            <Link to={`/events/${eventId}/`}><span className="glyphicon glyphicon-th-list" /></Link>
          </li>
          <li>
            <Link to="#"><span className="glyphicon glyphicon-user" /></Link>
          </li>
          <li>
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

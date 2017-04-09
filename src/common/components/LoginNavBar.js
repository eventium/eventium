import React, { Component } from 'react';
import { Link } from 'react-router';

export default class LoginNavBar extends Component {
  render() {
    return (
      <div className="navbar-wrapper">
        <ul className="menu">
          <li className="menu-item-logo">
            <Link to="/">Eventium</Link>
          </li>
        </ul>
      </div>
    );
  }
}

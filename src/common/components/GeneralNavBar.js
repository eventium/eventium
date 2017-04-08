import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';

export default class GeneralNavBar extends Component {


  render() {
    const { session } = this.props;
    let firstName = 'Unknown';
    if (session.user) {
      firstName = session.user.first_name;
    }

    return (
      <div className="navbar-wrapper">
        <ul className="menu">
          <li className="menu-item">
            <Link to="/"><Glyphicon glyph="globe" /></Link>
          </li>
          <NavDropdown eventKey={3} title={firstName} id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}><Glyphicon glyph="cog" />Account</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.2}><Glyphicon glyph="log-out" />Logout</MenuItem>
          </NavDropdown>
        </ul>
      </div>
    );
  }
}

GeneralNavBar.propTypes = {
  session: PropTypes.object.isRequired,
};

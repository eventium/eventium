import React, { Component, PropTypes } from 'react';
import { Link, browserHistory } from 'react-router';
import { NavDropdown, MenuItem, Glyphicon } from 'react-bootstrap';
import { logout } from '../actions/session';


export default class GeneralNavBar extends Component {

  handleLogOut() {
    this.props.dispatch(logout(this.context.router));
  }
  render() {
    const { session } = this.props;
    let firstName = 'Loading...';
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
            <MenuItem
              eventKey={3.1}
              onClick={() => {
                if (session.user) {
                  browserHistory.push(`/profile/${session.user.id}/`);
                }
              }}
            >
              <Glyphicon glyph="cog" />Account
            </MenuItem>
            <MenuItem divider />
            <MenuItem
              eventKey={3.2}
              onSelect={() => this.handleLogOut()}
            >
              <Glyphicon glyph="log-out" />Logout
            </MenuItem>
          </NavDropdown>
        </ul>
      </div>
    );
  }
}

GeneralNavBar.propTypes = {
  session: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};
GeneralNavBar.contextTypes = {
  router: PropTypes.object.isRequired,
};

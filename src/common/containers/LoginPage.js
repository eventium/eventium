import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import login from '../actions/session';

class LoginPage extends Component {
  render() {
    const session = this.props.session;
    const disabled = (session.status === 'requesting');
    const errorMessage = (session.status === 'error' ? session.message : '');
    return (
      <div>
        <span className="page-header">
          <h1>Eventium</h1>
        </span>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            const username = document.getElementById('username-input').value;
            const password = document.getElementById('password-input').value;
            this.props.dispatch(login(username, password));
          }}
        >
          <fieldset disabled={disabled}>
            <div>
              <label htmlFor="username-input">Username</label>
              <input type="text" id="username-input" name="username" />
            </div>

            <div>
              <label htmlFor="password-input">Password</label>
              <input type="password" id="password-input" name="password" />
            </div>

            <div>
              <input type="submit" value="Submit" />
            </div>
          </fieldset>
        </form>

        <div>{errorMessage}</div>

      </div>
    );
  }
}

LoginPage.propTypes = {

};

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(LoginPage);

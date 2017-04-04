import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { login, fetchSession } from '../actions/session';
import * as constants from '../constants';

class LoginPage extends Component {
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchSession());
  }
  componentDidUpdate(prevProps) {
    const prevSession = prevProps.session;
    const nowSession = this.props.session;
    if (prevSession.status !== constants.SESSION_STATUS_LOGGED_IN && nowSession.status === constants.SESSION_STATUS_LOGGED_IN) {
      this.context.router.push('/');
    }
  }
  render() {
    const session = this.props.session;
    const disabled = (session.status === constants.SESSION_STATUS_PENDING);
    const errorMessage = (session.error || '');
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
              <label htmlFor="username-input">Email:</label>
              <input type="text" id="username-input" name="username" />
            </div>

            <div>
              <label htmlFor="password-input">Password: </label>
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
LoginPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    session: state.session,
  };
}

export default connect(mapStateToProps)(LoginPage);

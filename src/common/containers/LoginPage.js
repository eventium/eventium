import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { login, fetchSession } from '../actions/session';
import * as constants from '../constants';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchSession());
  }
  componentDidUpdate(prevProps) {
    const prevSession = prevProps.session;
    const nowSession = this.props.session;
    if (prevSession.status !== constants.SESSION_STATUS_LOGGED_IN &&
      nowSession.status === constants.SESSION_STATUS_LOGGED_IN) {
      this.context.router.push('/');
    }
  }
  handleSubmit(e) {
    e.preventDefault();
    const { username, password } = this.state;
    this.props.dispatch(login(username, password));
  }
  handleInputChange(e) {
    const state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value;
    this.setState(state);
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

        <form onSubmit={e => this.handleSubmit(e)}>
          <fieldset disabled={disabled}>
            <div>
              <label htmlFor="username-input">Email:</label>
              <input type="text" id="username-input" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} />
            </div>

            <div>
              <label htmlFor="password-input">Password: </label>
              <input type="password" id="password-input" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
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
  session: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
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

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { signup, signupFailed } from '../actions/signupState';
import * as constants from '../constants';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, password2 } = this.state;
    if (password === '') {
      this.props.dispatch(signupFailed('Password can not be empty.'));
    } else if (password !== password2) {
      this.props.dispatch(signupFailed('Passwords do not match.'));
    } else {
      this.props.dispatch(signup(username, password));
    }
  }
  handleInputChange(e) {
    const state = Object.assign({}, this.state);
    state[e.target.id] = e.target.value;
    this.setState(state);
  }
  render() {
    const { signupState } = this.props;
    const disabled = (signupState.status === constants.SIGNUP_PENDING);
    const infoMessage = (signupState.message || '');
    const errorMessage = (signupState.error || '');
    return (
      <div>
        <span className="page-header">
          <h1>Sign up</h1>
        </span>

        <form onSubmit={e => this.handleSubmit(e)}>
          <fieldset disabled={disabled}>
            <div>
              <label htmlFor="username">Email:</label>
              <input type="text" id="username" name="username" value={this.state.username} onChange={e => this.handleInputChange(e)} />
            </div>

            <div>
              <label htmlFor="password">Password: </label>
              <input type="password" id="password" name="password" value={this.state.password} onChange={e => this.handleInputChange(e)} />
            </div>

            <div>
              <label htmlFor="password2">Repeat password: </label>
              <input type="password" id="password2" name="repeat password" value={this.state.password2} onChange={e => this.handleInputChange(e)} />
            </div>

            <div>
              <input type="submit" value="Submit" />
            </div>
          </fieldset>
        </form>

        <div>{infoMessage}</div>

        <div>{errorMessage}</div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  signupState: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
};
SignupPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    signupState: state.signupState,
  };
}

export default connect(mapStateToProps)(SignupPage);

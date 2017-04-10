import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { debounce } from 'throttle-debounce';
import { FormGroup, FormControl, Button, Col, ControlLabel, Alert } from 'react-bootstrap';
import { Link } from 'react-router';
import { signup, signupFailed } from '../actions/signupState';
import * as constants from '../constants';
import LoginNavBar from '../components/LoginNavBar';
import { loadUserFromEmailPublic, userTypingEmail } from '../actions/users';

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      password2: '',
      firstName: '',
      lastName: '',
      description: '',
      matchingPassword: 'unknown',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getPasswordValidationState = this.getPasswordValidationState.bind(this);
    this.validatePasswordFields = debounce(500, this.validatePasswordFields);
    this.validateEmailField = debounce(500, this.validateEmailField);
  }

  handleInputChange(e) {
    const { dispatch } = this.props;
    const state = Object.assign({}, this.state);
    state[e.target.name] = e.target.value;

    if (e.target.name.includes('password')) {
      state.matchingPassword = 'unknown';
      this.validatePasswordFields();
    }

    if (e.target.name.includes('username')) {
      dispatch(userTypingEmail());
      this.validateEmailField();
    }
    this.setState(state);
  }

  getPasswordValidationState() {
    if (this.state.matchingPassword && this.state.matchingPassword !== 'unknown') {
      return 'success';
    } else if (!this.state.matchingPassword) {
      return 'error';
    }
    return null;
  }

  validatePasswordFields() {
    if (this.state.password !== '' && this.state.password2 !== '') {
      let matchingPassword = 'unknown';
      if (this.state.password !== this.state.password2) {
        matchingPassword = false;
      } else {
        matchingPassword = true;
      }
      const state = Object.assign({}, this.state, { matchingPassword: matchingPassword });
      this.setState(state);
    }
  }

  getEmailValidationState() {
    const { found, notFound } = this.props;
    if (notFound) {
      return 'success';
    }
    if (found) {
      return 'error';
    }
    return null;
  }

  validateEmailField() {
    const { dispatch } = this.props;
    const email = this.state.username;

    if (/.+@.+/.test(email)) {
      dispatch(loadUserFromEmailPublic(email));
    }
  }

  showAlert(errorMessage) {
    if (errorMessage) {
      return (
        <Alert bsStyle="danger">
          {errorMessage}
        </Alert>
      );
    }
    return null;
  }

  handleSubmit(e) {
    e.preventDefault();
    const { username, password, password2, firstName, lastName, description } = this.state;

    if (password === '') {
      return this.props.dispatch(signupFailed('Password can not be empty.'));
    }

    if (password !== password2) {
      return this.props.dispatch(signupFailed('Passwords do not match.'));
    }

    if (this.props.found) {
      return this.props.dispatch(signupFailed('There is already an account with this email'));
    }

    this.props.dispatch(signup(username, password, firstName, lastName, description));
    this.context.router.goBack();
  }

  render() {
    const { signupState } = this.props;
    const pending = (signupState.status === constants.SIGNUP_PENDING);
    const errorMessage = (signupState.error || '');

    if (pending) {
      return (
        <div>
          <LoginNavBar />
          <div className="loader absolute-center" />
        </div>
      );
    }

    return (
      <div>
        <LoginNavBar />
        <div className="login-page-wrapper">
          {this.showAlert(errorMessage)}
          <form className="horizontal" onSubmit={this.handleSubmit}>
            <fieldset disabled={pending}>
              <FormGroup controlId="formHorizontalEmail" validationState={this.getEmailValidationState()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Email
                </Col>
                <Col sm={10}>
                  <FormControl type="email" placeholder="Email" name="username" required value={this.state.username} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword" validationState={this.getPasswordValidationState()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalPassword2" validationState={this.getPasswordValidationState()}>
                <Col componentClass={ControlLabel} sm={2}>
                  Confirm Password
                </Col>
                <Col sm={10}>
                  <FormControl type="password" placeholder="Password" name="password2" required value={this.state.password2} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalFirstName">
                <Col componentClass={ControlLabel} sm={2}>
                  First Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="First Name" name="firstName" required value={this.state.firstName} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLasttName">
                <Col componentClass={ControlLabel} sm={2}>
                  Last Name
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Last Name" name="lastName" required value={this.state.lastName} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup controlId="formHorizontalLasttName">
                <Col componentClass={ControlLabel} sm={2}>
                  Description (Optinal)
                </Col>
                <Col sm={10}>
                  <FormControl type="text" placeholder="Tell Us About You!" name="description" value={this.state.description} onChange={this.handleInputChange} />
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <Button bsStyle="primary" type="submit">
                    Sign Up
                  </Button>
                </Col>
              </FormGroup>

              <FormGroup>
                <Col smOffset={2} sm={10}>
                  <p><Link to={'/login'}>Already have an account?</Link></p>
                </Col>
              </FormGroup>
            </fieldset>
          </form>
        </div>
      </div>
    );
  }
}

SignupPage.propTypes = {
  user: PropTypes.object.isRequired,
  signupState: PropTypes.shape({
    status: PropTypes.string.isRequired,
  }).isRequired,
};

SignupPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user.data,
    signupState: state.signupState,
    notFound: state.user.notFound,
    found: state.user.found,
  };
}

export default connect(mapStateToProps)(SignupPage);

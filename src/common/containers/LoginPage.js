import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { FormGroup, FormControl, Button, Col, ControlLabel, Alert } from 'react-bootstrap';
import { login, fetchSession } from '../actions/session';
import * as constants from '../constants';
import LoginNavBar from '../components/LoginNavBar';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      this.context.router.goBack();
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

  showSuccess(infoMessage) {
    if (infoMessage) {
      return (
        <Alert bsStyle="success">
          {infoMessage}
        </Alert>
      );
    }
    return null;
  }

  render() {
    const { session, signupState } = this.props;
    const pending = (session.status === constants.SESSION_STATUS_PENDING);
    const redirect = session.redirect;
    const errorMessage = (session.error || '');
    const infoMessage = (signupState.message || '');

    if (pending || redirect) {
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
        <div className={redirect ? 'hidden' : ''} >
          <div className="login-page-wrapper">
            {this.showAlert(errorMessage)}
            {this.showSuccess(infoMessage)}
            <form className="horizontal" onSubmit={this.handleSubmit}>
              <fieldset disabled={pending}>
                <FormGroup controlId="formHorizontalEmail">
                  <Col componentClass={ControlLabel} sm={2}>
                    Email
                  </Col>
                  <Col sm={10}>
                    <FormControl type="email" placeholder="Email" name="username" required value={this.state.username} onChange={this.handleInputChange} />
                  </Col>
                </FormGroup>
  
                <FormGroup controlId="formHorizontalPassword">
                  <Col componentClass={ControlLabel} sm={2}>
                    Password
                  </Col>
                  <Col sm={10}>
                    <FormControl type="password" placeholder="Password" name="password" required value={this.state.password} onChange={this.handleInputChange} />
                  </Col>
                </FormGroup>
  
                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <Button bsStyle="primary" type="submit">
                      Log In
                    </Button>
                  </Col>
                </FormGroup>
  
                <FormGroup>
                  <Col smOffset={2} sm={10}>
                    <p>Don{"'"}t have an account? <Link to={'/signup'}>Sign Up</Link></p>
                  </Col>
                </FormGroup>
              </fieldset>
            </form>
          </div>
        </div>
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
    signupState: state.signupState,
  };
}

export default connect(mapStateToProps)(LoginPage);

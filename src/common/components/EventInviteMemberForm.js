import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { form, FormGroup, InputGroup, FormControl, Button, Glyphicon } from 'react-bootstrap';
import { debounce } from 'throttle-debounce';
import { loadUserFromEmail, userTypingEmail } from '../actions/users';


class EventInviteMemberForm extends Component {

  constructor(props, context) {
    super(props, context);

    this.onSubmit = this.onSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

    // This is done to wait until user stops typing before executing validation
    this.validateEmail = debounce(600, this.validateEmail);
  }

  onSubmit(event) {
    event.preventDefault();
    const { user, inviteUserToEvent } = this.props;
    if (user) {
      inviteUserToEvent(user);
    }
  }

  getValidationState() {
    const { found, notFound } = this.props;
    if (found) {
      return 'success';
    }
    if (notFound) {
      return 'error';
    }
    return null;
  }

  validateEmail(email) {
    const { dispatch } = this.props;
    // Do validation
    if (/.+@.+/.test(email)) {
      dispatch(loadUserFromEmail(email));
    }
  }

  handleChange(event) {
    const email = event.target.value;
    const { dispatch } = this.props;
    dispatch(userTypingEmail());
    this.validateEmail(email);
  }

  render() {
    const { found } = this.props;
    let validState = true;
    if (found) {
      validState = false;
    }

    return (
      <div className="event-invite-member-form-wrapper">
        <form onSubmit={this.onSubmit}>
          <FormGroup validationState={this.getValidationState()}>
            <InputGroup>
              <InputGroup.Addon><Glyphicon glyph="envelope" /></InputGroup.Addon>
              <FormControl type="email" placeholder="john.doe@example.com" onChange={this.handleChange} />
            </InputGroup>
          </FormGroup>
          <FormGroup className="clearfix">
            <Button type="submit" bsStyle="primary" className="pull-right" disabled={validState}>
              Send Invite
            </Button>
          </FormGroup>
        </form>
      </div>
    );
  }
}


EventInviteMemberForm.propTypes = {
  user: PropTypes.object.isRequired,
  inviteUserToEvent: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user.data,
    notFound: state.user.notFound,
    found: state.user.found,
  };
};
export default connect(mapStateToProps)(EventInviteMemberForm);

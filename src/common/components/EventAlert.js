import React, { Component, PropTypes } from 'react';
import { Alert } from 'react-bootstrap';

export default class EventAlert extends Component {
  render() {
    const { userExists } = this.props;
    if (userExists) {
      return (
        <Alert bsStyle="danger">
          User is already a member or has been invited to this event!
        </Alert>
      );
    }
    return null;
  }
}

EventAlert.PropTypes = {
  userExists: PropTypes.bool.isRequired,
};

import React, { Component, PropTypes } from 'react';
import moment from 'moment';
import { ButtonToolbar, Button } from 'react-bootstrap';

export default class Invite extends Component {
  render() {
    const { id, Event, acceptInvite, declineInvite } = this.props;
    return (
      <li className="list-group-item">
        <div className="list-item-title">
          {Event.title}
        </div>
        <div className="list-item-subtitle">
          {`On ${moment(Event.start_time).format('LLL')}`}
        </div>
        <div className="list-item-subtitle">
          @{Event.location}
        </div>
        <ButtonToolbar>
          <Button bsStyle="success" bsSize="small" onClick={() => (acceptInvite(id)) }>Accept</Button>
          <Button bsStyle="danger" bsSize="small" onClick={() => (declineInvite(id)) }>Decline</Button>
        </ButtonToolbar>
      </li>
    );
  }
}

Invite.PropTypes = {
  id: PropTypes.number.isRequired,
  Event: PropTypes.shape({
    title: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
  }).isRequired,
  acceptInvite: PropTypes.func.isRequired,
  declineInvite: PropTypes.func.isRequired,
};

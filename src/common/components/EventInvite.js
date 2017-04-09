import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

export default class EventInvite extends Component {
  render() {
    const { Guest } = this.props;
    return (
      <li className="list-group-item">
        <div className="list-item-title">
          {Guest.first_name} {Guest.last_name}
        </div>
      </li>
    );
  }
}

EventInvite.PropTypes = {
  id: PropTypes.number.isRequired,
  Guest: PropTypes.shape({
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
};

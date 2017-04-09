import React, { Component, PropTypes } from 'react';
import { ButtonToolbar, Button } from 'react-bootstrap';

export default class EventMember extends Component {
  render() {
    const { User } = this.props;
    return (
      <li className="list-group-item">
        <div className="list-item-title">
          {User.first_name} {User.last_name}
        </div>
      </li>
    );
  }
}

EventMember.PropTypes = {
  id: PropTypes.number.isRequired,
  User: PropTypes.shape({
    id: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
  }).isRequired,
};

import React, { Component, PropTypes } from 'react';
import EventInvite from './EventInvite';

export default class EventInviteList extends Component {
  render() {
    const { invites } = this.props;

    return (
      <ul className={'list-group'}>
        {invites.map(invite =>
          <EventInvite
            key={invite.id}
            {...invite}
          />,
        )}
      </ul>
    );
  }
}

EventInviteList.propTypes = {
  invites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    Guest: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
};

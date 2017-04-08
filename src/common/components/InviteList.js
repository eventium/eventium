import React, { Component, PropTypes } from 'react';
import Invite from './Invite';

export default class InviteList extends Component {
  render() {
    const { invites, acceptInvite, declineInvite } = this.props;

    return (
      <ul className={'list-group'}>
        {invites.map(invite =>
          <Invite
            key={invite.id}
            {...invite}
            acceptInvite={acceptInvite}
            declineInvite={declineInvite}
          />,
        )}
      </ul>
    );
  }
}

InviteList.propTypes = {
  invites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    Event: PropTypes.shape({
      title: PropTypes.string.isRequired,
      start_time: PropTypes.string.isRequired,
      location: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
  acceptInvite: PropTypes.func.isRequired,
  declineInvite: PropTypes.func.isRequired,
};

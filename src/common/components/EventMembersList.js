import React, { Component, PropTypes } from 'react';
import EventMember from './EventMember';

export default class EventMembersList extends Component {
  render() {
    const { members } = this.props;

    return (
      <ul className={'list-group'}>
        {members.map(member =>
          <EventMember
            key={member.id}
            {...member}
          />,
        )}
      </ul>
    );
  }
}

EventMembersList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    User: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
      last_name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired).isRequired,
};

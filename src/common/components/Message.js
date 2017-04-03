import React, { PropTypes } from 'react';

export default class Message extends React.Component {

  render() {
    const { message } = this.props;
    return (
      <li>
        <div>{message.content}</div>
      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

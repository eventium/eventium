import React, { PropTypes } from 'react';

export default class Message extends React.Component {

  render() {
    const { message } = this.props;
    return (
      <li>
        <div>{message.text}</div>
      </li>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

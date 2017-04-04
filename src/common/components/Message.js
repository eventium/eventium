import React, { PropTypes } from 'react';

export default class Message extends React.Component {

  renderMyMessage() {
    const { message } = this.props;
    return (
      <div>
        <div className="message-data text-right">
          <span className="message-data-time">10:10 AM, Today</span>&nbsp;
          <span className="message-data-name">Joe</span>
        </div>
        <div className="message my-message">{message.content}</div>
      </div>
    );
  }

  renderOtherMessage() {
    const { message } = this.props;
    return (
      <div>
        <div className="message-data text-left">
          <span className="message-data-name">Bob</span>
          <span className="message-data-time">11:10 AM, Today</span>&nbsp;
        </div>
        <div className="message other-message">{message.content}</div>
      </div>
    );
  }


  render() {
    // Remove me once we have real accounts
    const rng = Math.floor(Math.random() * 2);
    let message = null;
    if (rng === 0) {
      message = this.renderMyMessage();
    } else {
      message = this.renderOtherMessage();
    }
    return (
      <div>
        { message }
      </div>
    );
  }
}

Message.propTypes = {
  message: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};

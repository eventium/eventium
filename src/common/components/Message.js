import React, { PropTypes } from 'react';
import moment from 'moment';

export default class Message extends React.Component {

  renderMyMessage() {
    const { message } = this.props;
    return (
      <div>
        <div className="message-data text-right">
          <span className="message-data-time">{`${moment(message.created_on).calendar()}`}</span>&nbsp;
          <span className="message-data-name">Me</span>
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
          <span className="message-data-name">{message.User.first_name}</span>
          <span className="message-data-time">{`${moment(message.created_on).calendar()}`}</span>&nbsp;
        </div>
        <div className="message other-message">{message.content}</div>
      </div>
    );
  }


  render() {
    let message = null;
    if (this.props.session.user.id === this.props.message.user_id) {
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
  session: PropTypes.object.isRequired,
  message: PropTypes.shape({
    uuid: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    User: PropTypes.shape({
      first_name: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

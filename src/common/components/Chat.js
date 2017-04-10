import React, { Component, PropTypes } from 'react';
import { createMessage } from '../actions/messages';
import Message from './Message';
import MessageComposer from './MessageComposer';

export default class Chat extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    // Used to scroll the window to the end of the messages
    this.messagesEnd.scrollIntoView();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.messages.length !== this.props.messages.length) {
      this.messagesEnd.scrollIntoView();
    }
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    const eventId = this.props.params.id;
    if (newMessage.content.length !== 0) {
      dispatch(createMessage(eventId, newMessage));
    }
  }

  render() {
    const { messages, socket, session } = this.props;

    return (
      <div className="chat">
        <div className="messages">
          <ul className="list-unstyled">
            {messages.map(message =>
              <Message message={message} key={message.uuid} session={session} />,
            )}
          </ul>
          <div ref={node => this.messagesEnd = node} />
        </div>
        <MessageComposer {...this.props} socket={socket} onSave={this.handleSave} />
      </div>
    );
  }
}

Chat.propTypes = {
  session: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

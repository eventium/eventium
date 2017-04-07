import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/messages';
import Message from './Message';
import MessageComposer from './MessageComposer';

export default class Chat extends Component {

  constructor(props, context) {
    super(props, context);
    this.handleSave = this.handleSave.bind(this);
  }

  componentDidMount() {
    const { socket, dispatch } = this.props;
    socket.emit('join channel', this.props.params.id);

    socket.on('new message', msg => {
      // used to make sure that we do not dispatch receive message twice. For what ever reason socket.io
      // does not remove connection properly for react and dispatches the message twice on the page refresh.
      const alreadyExists = this.props.messages.some(msgObj => (msgObj.uuid === msg.uuid));
      if (!alreadyExists) {
        dispatch(actions.receiveRawMessage(msg));
      }
    });

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
      dispatch(actions.createMessage(eventId, newMessage));
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

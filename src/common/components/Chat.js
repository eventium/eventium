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
    socket.emit('joined channel', {});

    socket.on('new message', msg =>
      dispatch(actions.receiveRawMessage(msg)),
    );
  }

  handleSave(newMessage) {
    const { dispatch } = this.props;
    const eventId = this.props.params.id;
    if (newMessage.content.length !== 0) {
      dispatch(actions.createMessage(eventId, newMessage));
    }
  }

  render() {
    const { messages, socket } = this.props;

    return (
      <div>
        <ul>
          {messages.map(message =>
            <Message message={message} key={message.uuid} />,
          )}
        </ul>
        <MessageComposer {...this.props} socket={socket} onSave={this.handleSave} />
      </div>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

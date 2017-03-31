import React, { Component, PropTypes } from 'react';
import * as actions from '../actions/messages';
import Message from './Message';

export default class Chat extends Component {

  componentDidMount() {
    const { socket, dispatch } = this.props;
    socket.emit('joined channel', {});

    socket.on('new message', msg =>
      dispatch(actions.receiveRawMessage(msg)),
    );
  }

  render() {
    const { messages } = this.props;

    return (

      <ul>
        {messages.map(message =>
          <Message message={message} key={message.id} />,
        )}
      </ul>
    );
  }
}

Chat.propTypes = {
  messages: PropTypes.array.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

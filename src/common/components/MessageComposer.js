import React, { PropTypes } from 'react';
import uuid from 'node-uuid';

export default class MessageComposer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      content: '',
    };
  }

  handleSubmit(event) {
    const { socket } = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      const session = this.props.session;
      const newMessage = {
        uuid: uuid.v4(),
        content: text,
        user_id: session.user.id,
        created_on: Date.now(),
        User: {
          first_name: session.user.first_name,
        },
      };
      socket.emit('new message', newMessage);

      // Tells the Chat.js that we have a new msg and triggers its onSave()
      this.props.onSave(newMessage);
      this.setState({ content: '' });
    }
  }

  handleChange(event) {
    this.setState({ content: event.target.value });
  }

  render() {
    return (
      <div className="message-box">
        <textarea
          name="message"
          autoFocus="true"
          rows="3"
          placeholder="Type a message..."
          value={this.state.content}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
        />
      </div>
    );
  }
}

MessageComposer.propTypes = {
  session: PropTypes.object.isRequired,
  socket: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired, // Is used in Chat.js to trigger local messagelist update
};

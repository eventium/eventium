import React, { PropTypes } from 'react';

export default class MessageComposer extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.state = {
      text: '',
    };
  }

  handleSubmit(event) {
    const { socket } = this.props;
    const text = event.target.value.trim();
    if (event.which === 13) {
      event.preventDefault();
      const newMessage = {
        text: text,
      };
      socket.emit('new message', newMessage);

      // Tells the Chat.js that we have a new msg and triggers its onSave()
      this.props.onSave(newMessage);
      this.setState({ text: '' });
    }
  }

  handleChange(event) {
    this.setState({ text: event.target.value });
  }

  render() {
    return (
      <div>
        <input
          type="textarea"
          name="message"
          autoFocus="true"
          placeholder="Type a message..."
          value={this.state.text}
          onChange={this.handleChange}
          onKeyDown={this.handleSubmit}
        />
      </div>
    );
  }
}

MessageComposer.propTypes = {
  socket: PropTypes.object.isRequired,
  onSave: PropTypes.func.isRequired, // Is used in Chat.js to trigger local messagelist update
};

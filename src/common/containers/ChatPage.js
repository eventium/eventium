import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import { fetchMessages } from '../actions/messages';
import Chat from '../components/Chat';

const socket = io('', { path: '/api/chat' });

class ChatPage extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    const eventId = this.props.params.id;
    dispatch(fetchMessages(eventId));
  }

  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}

ChatPage.propTypes = {
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    messages: state.messages.data,
  };
};

export default connect(mapStateToProps)(ChatPage);

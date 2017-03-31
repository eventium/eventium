import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import { fetchMessages } from '../actions/messages';
import Chat from '../components/Chat';

const socket = io('', { path: '/api/chat' });

class ChatPage extends Component {

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(fetchMessages());
  }

  render() {
    return (
      <Chat {...this.props} socket={socket} />
    );
  }
}

ChatPage.propTypes = {
  eventId: PropTypes.number.isRequired,
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    eventId: state.eventId,
    messages: state.messages,
  };
};

export default connect(mapStateToProps)(ChatPage);

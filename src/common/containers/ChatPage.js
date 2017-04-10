import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import { fetchMessages, receiveRawMessage } from '../actions/messages';
import { redirectToLogin } from '../actions/session';
import Chat from '../components/Chat';
import NavBar from '../components/NavBar';

const socket = io('', { path: '/api/chat' });

class ChatPage extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    const eventId = this.props.params.id;
    const session = this.props.session;
    if (!session.user) {
      dispatch(redirectToLogin(this.context.router));
      return;
    }
    dispatch(fetchMessages(eventId));

    socket.emit('join room', this.props.params.id);

    socket.on('new message', msg => {
      dispatch(receiveRawMessage(msg));
    });
  }

  componentWillUnmount() {
    socket.emit('leave room', this.props.params.id);
  }

  render() {
    const eventId = this.props.params.id;
    return (
      <div>
        <NavBar eventId={eventId} />
        <Chat {...this.props} socket={socket} />
      </div>
    );
  }
}

ChatPage.propTypes = {
  session: PropTypes.object.isRequired,
  messages: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

ChatPage.contextTypes = {
  router: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {
    messages: state.messages.data,
    session: state.session,
  };
};

export default connect(mapStateToProps)(ChatPage);

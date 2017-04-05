import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import io from 'socket.io-client';
import { fetchMessages } from '../actions/messages';
import { login, fetchSession } from '../actions/session';
import Chat from '../components/Chat';

const socket = io('', { path: '/api/chat' });

class ChatPage extends Component {

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(fetchSession());
  }

  componentDidUpdate(prevProps) {
    const { dispatch } = this.props;
    const eventId = this.props.params.id;
    const session = this.props.session;
    if (!session.user) {
      this.context.router.push('/login');
      return;
    }
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
  session: PropTypes.object.isRequired,
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

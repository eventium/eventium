import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadEventMembers, loadEventInvites } from '../actions/users';
import { redirectToLogin } from '../actions/session';
import NavBar from '../components/NavBar';

class MembersPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const session = this.props.session;
    if (!session.user) {
      dispatch(redirectToLogin(this.context.router));
      return;
    }
    const eventId = this.props.params.id;
    //dispatch(loadEventMembers(session.id));
    //dispatch(loadEventInvites(session.user.id));
  }

  render() {
    const { session, dispatch } = this.props;
    const eventId = this.props.params.id;
    return (
      <div>
        <NavBar eventId={eventId} />
      </div>
    );
  }
}

MembersPage.propTypes = {
  invites: PropTypes.array.isRequired,
  members: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
};

MembersPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    invites: state.invites.data,
    members: state.events.data,
    session: state.session,
  };
};

export default connect(mapStateToProps)(MembersPage);

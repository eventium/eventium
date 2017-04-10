import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadUserProfile } from '../actions/users';
import GeneralNavBar from '../components/GeneralNavBar';

class ProfilePage extends Component {
  constructor(props) {
    super(props);

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillMount() {
    const userId = this.props.params.id;
    const session = this.props.session;
    if (!session.user) {
      this.context.router.push('/login');
    }

    this.props.getProfile(userId);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      session: newProps.session,
      user: newProps.userProfile,
    });
  }

  render() {
    const { session, user } = this.props;
    let { avatar } = user;

    if (!avatar) {
      avatar = 'uploads/default_avatar.png';
    }

    return (
      <div>
        <GeneralNavBar session={session} />
        <div className="container profile-page-wrapper">
          <div className="image-container">
            <img
              className="img-responsive profile-picture"
              src={`/${avatar}`}
              alt=""
            />
          </div>
          <h1>{`${user.first_name} ${user.last_name}`}</h1>
          <hr />
          <h2>Email</h2>
          <p>{user.email}</p>
          <h2>Description</h2>
          <p>{user.description}</p>
        </div>
        <div className="update-profile">
          <Link to={`/profile/${user.id}/update/`}>
            <span className="glyphicon glyphicon-pencil" />
          </Link>
        </div>
      </div>
    );
  }
}

ProfilePage.propTypes = {
  session: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

ProfilePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    session: state.session,
    user: state.userProfile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getProfile: (userId) => {
      dispatch(loadUserProfile(userId));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

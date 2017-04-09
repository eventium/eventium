import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadUserProfile, updateUserProfile } from '../actions/users';
import GeneralNavBar from '../components/GeneralNavBar';

class UpdateProfilePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
    };

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
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
      user: newProps.user,
    });
  }

  handleChange(e) {
    const user = Object.assign({}, this.state.userProfile);

    user[e.currentTarget.name] = e.currentTarget.value;

    this.setState(
      {
        user: user,
      },
    );
  }

  handleSubmit(event) {
    event.preventDefault();

    const userId = this.props.params.id;

    const form = event.currentTarget;

    this.props.updateProfile(userId, form.elements);

    this.context.router.push(`/profile/${userId}/`);
  }

  render() {
    const { session } = this.props;
    const { user } = this.state;

    return (
      <div>
        <GeneralNavBar session={session} />
        <div className="container profile-page-wrapper">
          <h1>Update Profile</h1>
          <form
            id="update-profile"
            method="POST"
            encType="multipart/form-data"
            onSubmit={this.handleSubmit}
          >
            <div className="form-group">
              <label htmlFor="avatar">Profile Image</label>
              <input
                type="file"
                className="form-control"
                name="avatar"
                id="avatar"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="first-name"
                placeholder="First Name"
                value={user.first_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="last-name"
                placeholder="Last Name"
                value={user.last_name}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                placeholder="Email"
                value={user.email}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                placeholder="Description"
                value={user.description}
                onChange={this.handleChange}
              />
            </div>
            <Link
              to={`/profile/${user.id}/`}
              className="btn btn-default btn-lg pull-left"
            >
              <span>Cancel</span>
            </Link>
            <button
              type="submit"
              className="btn btn-primary btn-lg pull-right"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    );
  }
}

UpdateProfilePage.propTypes = {
  session: PropTypes.object.isRequired,
  getProfile: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    first_name: PropTypes.string.isRequired,
    last_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
};

UpdateProfilePage.contextTypes = {
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
    updateProfile: (userId, formData) => {
      dispatch(updateUserProfile(userId, formData));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(UpdateProfilePage);

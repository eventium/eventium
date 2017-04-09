import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadUserProfile, updateUserProfile } from '../actions/users';
import GeneralNavBar from '../components/GeneralNavBar';

class UpdateProfilePage extends Component {
  constructor(props) {
    super(props);

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
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

  handleSubmit(event) {
    event.preventDefault();

    const userId = this.props.params.id;

    const form = event.currentTarget;

    this.props.updateProfile(userId, form.elements);

    this.context.router.push(`/profile/${userId}`);
  }

  render() {
    const { session, user } = this.props;

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
              <label htmlFor="picture">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                name="picture"
                id="picture"
                onChange={this.handleSubmit}
              />
            </div>
            <div className="form-group">
              <label htmlFor="first-name">First Name</label>
              <input
                type="text"
                className="form-control"
                name="first_name"
                id="first-name"
                placeHolder="First Name"
                value={user.first_name}
                onChange={this.handleSubmit}
              />
            </div>
            <div className="form-group">
              <label htmlFor="last-name">Last Name</label>
              <input
                type="text"
                className="form-control"
                name="last_name"
                id="last-name"
                placeHolder="Last Name"
                value={user.last_name}
                onChange={this.handleSubmit}
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                className="form-control"
                name="email"
                id="email"
                placeHolder="Email"
                value={user.email}
                onChange={this.handleSubmit}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                className="form-control"
                name="description"
                id="description"
                placeHolder="Description"
                value={user.description}
                onChange={this.handleSubmit}
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
    picture: PropTypes.string.isRequired,
  }).isRequired,
};

UpdateProfilePage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    session: state.session,
    user: state.user,
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

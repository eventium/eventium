import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import { createEvent } from '../actions/events';
import GeneralNavBar from '../components/GeneralNavBar';

class CreateEventPage extends Component {
  constructor(props) {
    super(props);

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const session = this.props.session;
    if (!session.user) {
      this.context.router.push('/login');
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({ event: newProps.event });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { onSubmit, session } = this.props;
    const form = event.currentTarget;

    const promise = new Promise((resolve, reject) => {
      onSubmit(form.elements, session.user.id, resolve, reject);
    });

    Promise.all([promise]).then((result) => {
      const id = result[0];
      this.context.router.push(`/events/${id}`);
    });
  }

  render() {
    const { session } = this.props;
    return (
      <div>
        <GeneralNavBar session={session} />
        <div className="container event-page-wrapper">
          <h1>Create Event</h1>
          <CreateEventForm onSubmit={this.handleSubmit} submitButton="Create Event" method="POST" />
        </div>
      </div>
    );
  }
}

CreateEventPage.propTypes = {
  session: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

CreateEventPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (formData, userId, resolve, reject) => {
      dispatch(createEvent(formData, userId, resolve, reject));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);

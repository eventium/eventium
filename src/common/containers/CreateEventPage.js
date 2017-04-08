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

    const { onSubmit } = this.props;
    const form = event.currentTarget;

    onSubmit(form.elements);

    this.context.router.push('/');
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
    onSubmit: (formData) => {
      dispatch(createEvent(formData));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateEventPage);

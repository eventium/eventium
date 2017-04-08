import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CreateEventForm from '../components/CreateEventForm';
import { updateEvent, loadEvent } from '../actions/events';
import NavBar from '../components/NavBar';

class UpdateEventPage extends Component {
  constructor(props) {
    super(props);

    this.componentWillMount = this.componentWillMount.bind(this);
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    const id = this.props.params.id;
    const { onLoad } = this.props;

    const session = this.props.session;
    if (!session.user) {
      this.context.router.push('/login');
      return;
    }

    onLoad(id);
  }

  componentWillReceiveProps(newProps) {
    this.setState({ event: newProps.event });
  }

  handleSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    this.props.onSubmit(form.elements);

    this.context.router.push(`/events/${this.props.params.id}`);
  }

  render() {
    const id = this.props.params.id;
    return (
      <div>
        <NavBar eventId={id} />
        <div className="container event-page-wrapper">
          <h1>Update Event</h1>
          <CreateEventForm
            onSubmit={this.handleSubmit}
            event={this.props.event}
            submitButton="Update Event"
            method="PUT"
          />
        </div>
      </div>
    );
  }
}

UpdateEventPage.propTypes = {
  session: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onLoad: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    province: PropTypes.string.isRequired,
    postal_code: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    start_time: PropTypes.string.isRequired,
    end_time: PropTypes.string.isRequired,
  }).isRequired,
};

UpdateEventPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    event: state.event.event,
    session: state.session,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (formData) => {
      dispatch(updateEvent(formData));
    },
    onLoad: (id) => {
      dispatch(loadEvent(id));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateEventPage);

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import CreateEventForm from '../components/CreateEventForm';
import { updateEvent, loadEvent } from '../actions/events';

class UpdateEventPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const id = this.props.params.id;
    const { onLoad } = this.props;
    onLoad(id);
  }

  render() {
    const { onSubmit, event } = this.props;

    return (
      <div className="container">
        <h1>Update Event</h1>
        <CreateEventForm onSubmit={onSubmit} event={event} submitButton="Update Event" method="PUT" />
      </div>
    );
  }
}

UpdateEventPage.propTypes = {
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

const mapStateToProps = (state) => {
  return {
    event: state.event,
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

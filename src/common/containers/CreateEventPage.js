import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import CreateEventForm from '../components/CreateEventForm';
import { createEvent } from '../actions/events';

class CreateEventPage extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { onSubmit } = this.props;

    return (
      <div className="container">
        <h1>Create Event</h1>
        <CreateEventForm onSubmit={onSubmit} submitButton="Create Event" method="POST" />
      </div>
    );
  }
}

CreateEventPage.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};


const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (formData) => {
      dispatch(createEvent(formData));
    },
  };
};

export default connect(null, mapDispatchToProps)(CreateEventPage);

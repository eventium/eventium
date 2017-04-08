import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      event: {},
    };

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(newProps) {
    const { event } = newProps;

    if (event.start_time) {
      const sdate = new Date(event.start_time);
      const year = sdate.getFullYear();
      let month = sdate.getMonth() + 1;
      let date = sdate.getDate();
      let hour = sdate.getHours();
      let minute = sdate.getMinutes();

      month = this.formatDateNumber(month);
      date = this.formatDateNumber(date);
      hour = this.formatDateNumber(hour);
      minute = this.formatDateNumber(minute);

      event.start_time = `${hour}:${minute}`;
      event.start_date = `${year}-${month}-${date}`;
    }
    if (event.end_time) {
      const edate = new Date(event.end_time);
      const year = edate.getFullYear();
      let month = edate.getMonth() + 1;
      let date = edate.getDate();
      let hour = edate.getHours();
      let minute = edate.getMinutes();

      month = this.formatDateNumber(month);
      date = this.formatDateNumber(date);
      hour = this.formatDateNumber(hour);
      minute = this.formatDateNumber(minute);

      event.end_time = `${hour}:${minute}`;
      event.end_date = `${year}-${month}-${date}`;
    }

    this.setState(
      {
        event: Object.assign({}, event),
      },
    );
  }

  handleChange(e) {
    const event = Object.assign({}, this.state.event);

    event[e.currentTarget.name] = e.currentTarget.value;

    this.setState(
      {
        event: event,
      },
    );
  }

  formatDateNumber(int) {
    let output = '';

    if (int < 10) {
      output = `0${int}`;
    } else {
      output = int.toString();
    }

    return output;
  }

  render() {
    const { event } = this.state;
    let cancelLink;

    if (event.id) {
      cancelLink = `/events/${event.id}/update`;
    } else {
      cancelLink = '';
    }

    return (
      <div>
        <form
          id="create-event"
          method={this.props.method}
          encType="multipart/form-data"
          onSubmit={this.props.onSubmit}
        >
          <input
            type="hidden"
            name="id"
            {...event ? { value: event.id } : {}}
            onChange={this.handleChange}
          />
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              id="image"
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title" id="title"
              placeholder="Title"
              {...event ? { value: event.title } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              id="start-date"
              placeholder="Start Date"
              {...event ? { value: event.start_date } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input
              type="time"
              className="form-control"
              name="start_time"
              id="start-time"
              placeholder="Start Time"
              {...event ? { value: event.start_time } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              id="end-date"
              placeholder="End Date"
              {...event ? { value: event.end_date } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input
              type="time"
              className="form-control"
              name="end_time"
              id="end-time"
              placeholder="End Time"
              {...event ? { value: event.end_time } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              id="location"
              placeholder="Location"
              {...event ? { value: event.location } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              id="address"
              placeholder="Address"
              {...event ? { value: event.address } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              id="city"
              placeholder="City"
              {...event ? { value: event.city } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input
              type="text"
              className="form-control"
              name="province"
              id="province"
              placeholder="Province"
              {...event ? { value: event.province } : {}}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="postal-code">Postal Code</label>
            <input
              type="text"
              className="form-control"
              name="postal_code"
              id="postal-code"
              placeholder="Postal code"
              {...event ? { value: event.postal_code } : {}}
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
              {...event ? { value: event.description } : {}}
              onChange={this.handleChange}
            />
          </div>
          <Link
            to={cancelLink}
            className="btn btn-default btn-lg pull-left"
          >
            <span>Cancel</span>
          </Link>
          <button
            type="submit"
            className="btn btn-primary btn-lg pull-right"
          >
            {this.props.submitButton}
          </button>
        </form>
      </div>
    );
  }
}

CreateEventForm.propTypes = {
  method: PropTypes.string.isRequired,
  submitButton: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  event: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    location: PropTypes.string,
    address: PropTypes.string,
    city: PropTypes.string,
    province: PropTypes.string,
    postal_code: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    start_time: PropTypes.string,
    end_time: PropTypes.string,
  }),
};

export default CreateEventForm;

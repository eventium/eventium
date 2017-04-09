import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);

    this.timeout = null;

    this.state = {};
    this.state.event = {};
    this.state.fields = {
      title: {},
      start_date: {},
      start_time: {},
      end_date: {},
      end_time: {},
      location: {},
      address: {},
      city: {},
      province: {},
      postal_code: {},
      description: {},
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

    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    event[name] = value;

    this.setState(
      {
        event: event,
      },
    );

    if (name === 'image') {
      return;
    }

    this.setState((prevState) => {
      const state = Object.assign({}, prevState.fields);
      state[name].className = '';

      return {
        fields: state,
      };
    });

    const validity = this.validateField(name, value);

    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      this.setState((prevState) => {
        const state = Object.assign({}, prevState.fields);
        state[name] = validity;

        return {
          fields: state,
        };
      });
    }, 800);
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

  validateField(name, value) {
    const validity = {
      valid: true,
      message: '',
      className: ' has-success',
    };

    switch (name) {
      case 'title': {
        if (value.length === 0) {
          validity.valid = false;
          validity.message = 'A title is required';
          validity.className = ' has-error';
        }
        break;
      }
      case 'start_date': {
        if (value.length === 0) {
          validity.valid = false;
          validity.message = 'A start date is required';
          validity.className = ' has-error';
          break;
        }

        // var date1 = new Date(value);
        // var date2 = new Date();

        // date2.setHours(0);
        // date2.setMinutes(0);
        // date2.setSeconds(0);

        // if (date1.getTime() < date2.getTime()) {
        //   validity.valid = false;
        //   validity.message = 'Start date is before current date';
        //   validity.className = ' has-error';
        // }

        break;
      }
      case 'end_date': {
        if (value.length === 0) {
          validity.valid = false;
          validity.message = 'An end date is required';
          validity.className = ' has-error';
          break;
        }

        // var date1 = new Date(value);
        // var date2 = new Date();

        // date2.setHours(0);
        // date2.setMinutes(0);
        // date2.setSeconds(0);

        // if (date1.getTime() < date2.getTime()) {
        //   validity.valid = false;
        //   validity.message = 'End date is before current date';
        //   validity.className = ' has-error';
        // }

        break;
      }
      case 'start_time': {
        if (value.length === 0) {
          validity.valid = false;
          validity.message = 'A start time is required';
          validity.className = ' has-error';
        }
        break;
      }
      case 'end_time': {
        if (value.length === 0) {
          validity.valid = false;
          validity.message = 'An end time is required';
          validity.className = ' has-error';
        }
        break;
      }
      case 'location': {
        if (value.length === 0) {
          validity.valid = false;
          validity.message = 'A location is required';
          validity.className = ' has-error';
        }
        break;
      }
    }

    return validity;
  }

  getClass(name) {
    let className = 'form-group';

    if (!this.state.fields[name] || this.state.fields[name].valid === undefined) {
      return className;
    }

    className += this.state.fields[name].className;

    return className;
  }

  render() {
    const { event } = this.state;
    let cancelLink;

    if (event.id) {
      cancelLink = `/events/${event.id}/`;
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
          <div className={this.getClass('title')}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title" id="title"
              placeholder="Title"
              {...event ? { value: event.title } : {}}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={this.getClass('start_date')}>
            <label htmlFor="start-date">Start Date</label>
            <input
              type="date"
              className="form-control"
              name="start_date"
              id="start-date"
              placeholder="Start Date"
              {...event ? { value: event.start_date } : {}}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={this.getClass('start_time')}>
            <label htmlFor="start-time">Start Time</label>
            <input
              type="time"
              className="form-control"
              name="start_time"
              id="start-time"
              placeholder="Start Time"
              {...event ? { value: event.start_time } : {}}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={this.getClass('end_date')}>
            <label htmlFor="end-date">End Date</label>
            <input
              type="date"
              className="form-control"
              name="end_date"
              id="end-date"
              placeholder="End Date"
              {...event ? { value: event.end_date } : {}}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={this.getClass('end_time')}>
            <label htmlFor="end-time">End Time</label>
            <input
              type="time"
              className="form-control"
              name="end_time"
              id="end-time"
              placeholder="End Time"
              {...event ? { value: event.end_time } : {}}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={this.getClass('location')}>
            <label htmlFor="location">Location</label>
            <input
              type="text"
              className="form-control"
              name="location"
              id="location"
              placeholder="Location"
              {...event ? { value: event.location } : {}}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className={this.getClass('address')}>
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
          <div className={this.getClass('city')}>
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
          <div className={this.getClass('province')}>
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
          <div className={this.getClass('postal_code')}>
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
          <div className={this.getClass('description')}>
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
          <br />
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

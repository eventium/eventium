import React, { Component, PropTypes } from 'react';

class CreateEventForm extends Component {
  constructor(props) {
    super(props);
  }

  formatDateNumber(int) {
    let output = '';

    if(int < 10) {
      output = '0' + int;
    }
    else {
      output = int.toString();
    }

    return output;
  }

  render() {
    const { event = {} } = this.props;

    const { id = '' } = event;
    const { title = '' } = event;
    const { description = '' } = event;
    const { location = '' } = event;
    const { address = '' } = event;
    const { city = '' } = event;
    const { province = '' } = event;
    const { postal_code = '' } = event;
    const { start_time = '' } = event;
    const { end_time = '' } = event;

    let startTime = '';
    let startDate = '';
    let endTime = '';
    let endDate = '';

    if(start_time) {
      const sdate = new Date(start_time);
      let year = sdate.getFullYear();
      let month = sdate.getMonth() + 1;
      let date = sdate.getDate();
      let hour = sdate.getHours();
      let minute = sdate.getMinutes();

      month = this.formatDateNumber(month);
      date = this.formatDateNumber(date);
      hour = this.formatDateNumber(hour);
      minute = this.formatDateNumber(minute);

      startTime = `${hour}:${minute}`;
      startDate = `${year}-${month}-${date}`;
    }
    if(end_time) {
      const edate = new Date(end_time);
      let year = edate.getFullYear();
      let month = edate.getMonth() + 1;
      let date = edate.getDate();
      let hour = edate.getHours();
      let minute = edate.getMinutes();

      month = this.formatDateNumber(month);
      date = this.formatDateNumber(date);
      hour = this.formatDateNumber(hour);
      minute = this.formatDateNumber(minute);

      endTime = `${hour}:${minute}`;
      endDate = `${year}-${month}-${date}`;
    }

    return (
      <div>
        <form id="create-event" method={this.props.method} encType="multipart/form-data" onSubmit={(event) => {
          event.preventDefault();

          var form = event.currentTarget;

          this.props.onSubmit(form.elements);
        }}>
          <input type="hidden" name="id" {...id ? {value: id} : {}} />
          <div className="form-group">
            <label htmlFor="image">Image</label>
            <input type="file" className="form-control" name="image" id="image" />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" name="title" id="title" placeholder="Title" {...title ? {value: title} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="start-date">Start Date</label>
            <input type="date" className="form-control" name="start_date" id="start-date" placeholder="Start Date" {...startDate ? {value: startDate} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="start-time">Start Time</label>
            <input type="time" className="form-control" name="start_time" id="start-time" placeholder="Start Time" {...startTime ? {value: startTime} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="end-date">End Date</label>
            <input type="date" className="form-control" name="end_date" id="end-date" placeholder="End Date" {...endDate ? {value: endDate} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="end-time">End Time</label>
            <input type="time" className="form-control" name="end_time" id="end-time" placeholder="End Time" {...endTime ? {value: endTime} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input type="text" className="form-control" name="location" id="location" placeholder="Location" {...location ? {value: location} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="address">Address</label>
            <input type="text" className="form-control" name="address" id="address" placeholder="Address" {...address ? {value: address} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" className="form-control" name="city" id="city" placeholder="City" {...city ? {value: city} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="province">Province</label>
            <input type="text" className="form-control" name="province" id="province" placeholder="Province" {...province ? {value: province} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="postal-code">Postal Code</label>
            <input type="text" className="form-control" name="postal_code" id="postal-code" placeholder="Postal code" {...postal_code ? {value: postal_code} : {}} />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea className="form-control" name="description" id="description" placeholder="Description" {...description ? {value: description} : {}} />
          </div>
          <button type="submit" className="btn btn-primary btn-lg pull-right">{this.props.submitButton}</button>
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

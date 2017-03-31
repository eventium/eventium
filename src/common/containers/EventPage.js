import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { loadEvent } from '../actions/events';

class EventPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    const id = this.props.params.id;
    const { dispatch } = this.props;
    dispatch(loadEvent(id));
  }

  render() {
    const { title, description, location, address, city, province, postal_code } = this.props.event;
    const startTime = new Date(this.props.event.start_time);
    const endTime = new Date(this.props.event.end_time);
    return (
      <div>
        <span className="page-header">
          <Link to="/" role="button">
            <span className="glyphicon glyphicon-chevron-left back-button" />
          </Link>
          <h1>Event</h1>
        </span>
        <ul className="nav nav-pills">
          <li role="presentation" className="active">
            <Link to="#">Details</Link>
          </li>
          <li role="presentation">
            <Link to="#">People</Link>
          </li>
          <li role="presentation">
            <Link to="#">Chat</Link>
          </li>
        </ul>
        <div className="container">
          <h2>Title</h2>
          <div>{title}</div>
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Time</h2>
          <div className="spaced-out">
            <div>{`Starts: ${startTime.toLocaleDateString()} ${startTime.toLocaleTimeString()}`}</div>
            <div>{`Ends: ${endTime.toLocaleDateString()} ${endTime.toLocaleTimeString()}`}</div>
          </div>
          <h2>Location</h2>

          <div className="spaced-out">
            <div>{location}</div>
            <div>
              <div>{address}</div>
              <div>{`${province} ${city}`}</div>
              <div>{postal_code}</div>
            </div>
          </div>


        </div>
      </div>
    );
  }
}

EventPage.propTypes = {
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

export default connect(mapStateToProps)(EventPage);

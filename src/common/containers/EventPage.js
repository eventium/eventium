import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { redirectToLogin } from '../actions/session';
import { loadEvent } from '../actions/events';
import NavBar from '../components/NavBar';

class EventPage extends Component {
  constructor(props) {
    super(props);

    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    const session = this.props.session;
    if (!session.user) {
      dispatch(redirectToLogin(this.context.router));
      return;
    }
    const id = this.props.params.id;
    dispatch(loadEvent(id));
  }

  componentWillReceiveProps(newProps) {
    this.setState({ event: newProps.event });
  }

  render() {
    const { image, title, description, location, address, city, province, postal_code } = this.props.event;
    const startTime = new Date(this.props.event.start_time);
    const endTime = new Date(this.props.event.end_time);
    const id = this.props.params.id;
    if (!title) {
      return (
        <div className="loader absolute-center" />
      );
    }
    return (
      <div>
        <NavBar eventId={id} />
        <div className="container event-page-wrapper">
          <h1>{title}</h1>
          {image &&
            <img
              src={`/${image}`}
              alt=""
            />
          }
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
        <div className="update-event">
          <Link to={`/events/${id}/update/`}>
            <span className="glyphicon glyphicon-pencil" />
          </Link>
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
EventPage.contextTypes = {
  router: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    event: state.event.event,
    session: state.session,
  };
};

export default connect(mapStateToProps)(EventPage);

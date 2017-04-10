import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { Grid, Row, Button, Col } from 'react-bootstrap';
import moment from 'moment';

export default class Event extends Component {
  render() {
    const { id, title, start_time, location, leaveEvent } = this.props;
    return (
      <div className="individual-event-wrapper">
        <Grid>
          <Row>
            <li className="list-group-item clearfix">
              <Col xs={9}>
                <Link key={id} to={`/events/${id}`} >
                  <div className="list-item-title">{title}</div>
                </Link>
                <div className="list-item-subtitle">
                  {`On ${moment(start_time).format('LLL')}`}
                </div>
                <div className="list-item-subtitle">@{location}</div>
              </Col>
              <Col xs={3} className="event-membership-leave-button-wrapper">
                <Button bsStyle="danger" type="submit" onClick={() => (leaveEvent(id))}>Leave</Button>
              </Col>
            </li>
          </Row>
        </Grid>
      </div>
    );
  }
}

Event.PropTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  start_time: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  leaveEvent: PropTypes.func.isRequired,
};

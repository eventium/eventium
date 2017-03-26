import { connect } from 'react-redux'
import React, { Component, PropTypes } from 'react'
import { loadEvent } from '../actions/events'
import { Link } from 'react-router';

class EventPage extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    const id = this.props.params.id;
    const { dispatch } = this.props
    dispatch(loadEvent(id))
  }

  render() {
    const { title, time, location, description } = this.props.event;
    const date = new Date(time)
    return (
      <div>
        <span className='page-header'>
          <Link to='/' role='button'>
            <span className='glyphicon glyphicon-chevron-left back-button'></span>
          </Link>
          <h1>{title}</h1>
        </span>
        <ul className='nav nav-pills'>
          <li role='presentation' className='active'>
            <Link to='#'>Details</Link>
          </li>
          <li role='presentation'>
            <Link to='#'>People</Link>
          </li>
          <li role='presentation'>
            <Link to='#'>Chat</Link>
          </li>
        </ul>
        <div className='container'>
          <h2>Title</h2>
          <div>{title}</div>
          <h2>Description</h2>
          <p>{description}</p>
          <h2>Time</h2>
          <div>
            <span className='spaced-out'>{date.toLocaleDateString()}</span>
            <span className='spaced-out'>{date.toLocaleTimeString()}</span>
          </div>
          <h2>Location</h2>
          {location ?
            <div>
              <div className='spaced-out'>{location.city}</div>
              <div>
                <span className='spaced-out'>{location.address}</span>
                <span className='spaced-out'>{location.postal}</span>
              </div>
            </div> : <div></div>
          }

        </div>
      </div>
    )
  }
}

EventPage.propTypes = {
  event: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    location: PropTypes.shape({
      city: PropTypes.string.isRequired,
      address: PropTypes.string.isRequired,
      postal: PropTypes.string.isRequired
    }),
    description: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state) => {
  return {
    event: state.event
  }
}

export default connect(mapStateToProps)(EventPage)

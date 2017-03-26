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
    const { title } = this.props.event;
    return (
      <div>
        <h1>{title}</h1>
        <Link to='/'>« Back</Link>
      </div>
    )
  }
}

EventPage.propTypes = {
  event: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired).isRequired
}

const mapStateToProps = (state) => {
  return {
    event: state.event
  }
}

export default connect(mapStateToProps)(EventPage)

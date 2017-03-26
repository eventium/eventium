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
          <div className='form-horizontal'>
            <div className='form-group'>
              <div className='col-md-6'>
                <h3>Event name</h3>
                <input type='text' className='form-control' placeholder='Name' required></input>
                <h3>Details</h3>
                <textarea className='form-control' rows='3' required></textarea>

                <h3>Time</h3>
                <div>
                  <select name='Year' required>
                    {[2017, 2018, 2019].map(year => <option value={year}>{year}</option>)}
                  </select>
                  <select name='Month' required>
                    {['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'].map((monthName, monthNumber) => {
                        return <option value={monthNumber + 1}>{monthName}</option>
                      })}
                  </select>
                  <select name='Day' required>
                    {[...Array(31).keys()].map(n => <option value={n + 1}>{n + 1}</option>)}
                  </select>
                </div>
                <div>
                  <select name='Hour' required>
                    {[...Array(23).keys()].map(n => <option value={n}>{n}</option>)}
                  </select>
                  <span>:</span>
                  <select name='Minute' required>
                    {[...Array(12).keys()].map(n => <option value={n * 5}>{n * 5}</option>)}
                  </select>
                  <span>:</span>
                  <select name='Second' required>
                    {[...Array(12).keys()].map(n => <option value={n * 5}>{n * 5}</option>)}
                  </select>
                </div>

                <h3>Location</h3>
                <input type='text' className='form-control' placeholder='City' required></input>
                <input type='text' className='form-control' placeholder='Address' required></input>
                <input type='text' className='form-control' placeholder='Postal code' required></input>
                <Link className='btn btn-primary btn-sm' to='#' role='button'>Save</Link>
              </div>
            </div>
          </div>
        </div>
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

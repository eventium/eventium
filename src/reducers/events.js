import * as constants from '../constants'
import { combineReducers } from 'redux'

const events = (state = [], action) => {
  switch (action.type) {
    case constants.RECEIVE_EVENTS: {
      return action.events
    }
    default:
      return state
  }
}

export default events
 

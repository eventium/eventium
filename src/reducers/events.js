import * as constants from '../constants'
import { combineReducers } from 'redux'

export const events = (state = [], action) => {
  switch (action.type) {
    case constants.RECEIVE_EVENTS: {
      return action.events
    }
    default:
      return state
  }
}

export const event = (state = {}, action) => {
  switch (action.type) {
    case constants.RECEIVE_INDIVIDUAL_EVENT: {
      return Object.assign({}, {
        id: action.id,
        title: action.title,
        time: action.time,
        location: action.location,
        description: action.description
      })
    }
    default:
      return state
  }
}

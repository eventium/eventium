import fetch from 'isomorphic-fetch';

import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS
} from '../constants'


function requestEvents() {
  return {
    type: REQUEST_EVENTS,
    events: []
  }
}

function receiveEvents(json) {
  return {
    type: RECEIVE_EVENTS,
    events: json.events
  }
}

export function loadEvents() {
  const url = 'http://localhost:3000/api/events/'

  return dispatch => {
    dispatch(requestEvents())

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}

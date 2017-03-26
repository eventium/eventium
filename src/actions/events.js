import fetch from 'isomorphic-fetch';

import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  REQUEST_INDIVIDUAL_EVENT,
  RECEIVE_INDIVIDUAL_EVENT
} from '../constants'

const HOST = 'http://localhost:3000'


// -------------------------------------------------------------------------------------------------
// GET /api/events/
// -------------------------------------------------------------------------------------------------

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
  const url = `${HOST}/api/events/`

  return dispatch => {
    dispatch(requestEvents())

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
  }
}


// -------------------------------------------------------------------------------------------------
// GET /api/events/:id
// -------------------------------------------------------------------------------------------------

function requestEvent(id) {
  return {
    type: REQUEST_INDIVIDUAL_EVENT,
    id: id,
    title: ''
  }
}

function receiveEvent(id, json) {
  return {
    type: RECEIVE_INDIVIDUAL_EVENT,
    id: id,
    title: json.title,
    time: json.time,
    location: json.location,
    description: json.description
  }
}

export function loadEvent(id) {
  const url = `${HOST}/api/events/${id}`

  return dispatch => {
    dispatch(requestEvent())

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveEvent(id, json)))
  }
}

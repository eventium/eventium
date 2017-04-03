import fetch from 'isomorphic-fetch';

import * as types from '../constants';

const HOST = 'http://localhost:3000';


// -------------------------------------------------------------------------------------------------
// GET /api/messages/
// -------------------------------------------------------------------------------------------------


function addMessage(message) {
  return {
    type: types.ADD_MESSAGE,
    message,
  };
}

function requestMessages() {
  return {
    type: types.LOAD_MESSAGES,
  };
}

function receiveMessages(json) {
  return {
    type: types.LOAD_MESSAGES_SUCCESS,
    json,
  };
}

export function fetchMessages(eventId) {
  const url = `${HOST}/api/events/${eventId}/messages/`;

  return dispatch => {
    dispatch(requestMessages());

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json)))
      .catch(error => { throw error });
  };
}

export function createMessage(eventId, message) {
  const url = `${HOST}/api/event/${eventId}/messages/`;

  return dispatch => {
    dispatch(addMessage(message));
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    })
    .catch(error => { throw error });
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message,
  };
}

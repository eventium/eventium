import fetch from 'isomorphic-fetch';

import {
  REQUEST_USER_INVITES,
  RECEIVE_USER_INVITES,
  REQUEST_USER_EVENTS,
  RECEIVE_USER_EVENTS,
} from '../constants';

const HOST = 'http://localhost:3000';


// -------------------------------------------------------------------------------------------------
// GET /api/users/${userId}/invites/
// -------------------------------------------------------------------------------------------------

function requestUserInvites() {
  return {
    type: REQUEST_USER_INVITES,
  };
}

function receiveUserInvites(json) {
  return {
    type: RECEIVE_USER_INVITES,
    json,
  };
}

export function loadUserInvites(userId) {
  const url = `${HOST}/api/users/${userId}/invites/`;

  return dispatch => {
    dispatch(requestUserInvites());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(receiveUserInvites(json)))
      .catch((err) => {
        dispatch(receiveUserInvites([]));
        console.log('Failed to retrieve user:', userId, 'invites:', err);
      });
  };
}

// -------------------------------------------------------------------------------------------------
// GET /api/users/${userId}/events
// -------------------------------------------------------------------------------------------------

function requestUserEvents() {
  return {
    type: REQUEST_USER_EVENTS,
  };
}

function receiveUserEvents(json) {
  return {
    type: RECEIVE_USER_EVENTS,
    json,
  };
}

export function loadUserEvents(userId) {
  const url = `${HOST}/api/users/${userId}/events/`;

  return dispatch => {
    dispatch(requestUserEvents());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(receiveUserEvents(json)))
      .catch((err) => {
        dispatch(receiveUserEvents([]));
        console.log('Failed to retrieve user:', userId, 'events:', err);
      });
  };
}

import fetch from 'isomorphic-fetch';

import {
  REQUEST_USER_INVITES,
  RECEIVE_USER_INVITES,
  REQUEST_USER_EVENTS,
  RECEIVE_USER_EVENTS,
  RECEIVE_DELETE_USER_INVITE,
  REQUEST_USER_FROM_EMAIL,
  RECEIVE_USER_FROM_EMAIL,
  RECEIVE_USER_FROM_EMAIL_NOT_FOUND,
  USER_TYPING_EMAIL,
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


// -------------------------------------------------------------------------------------------------
// DELETE /api/users/${userId}/invites/${inviteId}
// -------------------------------------------------------------------------------------------------

function receiveDeleteInvite(inviteId) {
  return {
    type: RECEIVE_DELETE_USER_INVITE,
    inviteId,
  };
}

export function deleteUserInvite(userId, inviteId) {
  const url = `${HOST}/api/users/${userId}/invites/${inviteId}`;

  const message = {
    method: 'DELETE',
    credentials: 'same-origin',
  };

  return dispatch => {
    return fetch(url, message)
      .then(response => {
        if (response.ok) {
          dispatch(receiveDeleteInvite(inviteId));
        }
      })
      .catch((err) => {
        console.log('Failed to delete user:', userId, 'invite:', inviteId, err);
      });
  };
}

// -------------------------------------------------------------------------------------------------
// POST /api/users/${userId}/membership/
// -------------------------------------------------------------------------------------------------

export function createUserMembership(userId, invite) {
  const url = `${HOST}/api/users/${userId}/membership/`;
  const eventId = invite.event_id
  const message = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ eventId }),
  };

  return dispatch => {
    return fetch(url, message)
      .then(response => {
        if (response.ok) {
          // let loadUserEvents() handle re-fetching events.
          dispatch(loadUserEvents(userId));
          dispatch(deleteUserInvite(userId, invite.id));
        }
      })
      .catch((err) => {
        console.log('Failed to create membership user:', userId, 'eventId:', eventId, err);
      });
  };
}

// -------------------------------------------------------------------------------------------------
// GET /users/email/${email}
// -------------------------------------------------------------------------------------------------

function requestUserFromEmail() {
  return {
    type: REQUEST_USER_FROM_EMAIL,
  };
}

function receiveUserFromEmail(json) {
  return {
    type: RECEIVE_USER_FROM_EMAIL,
    json,
  };
}

function receiveUserFromEmailNotFound() {
  return {
    type: RECEIVE_USER_FROM_EMAIL_NOT_FOUND,
  };
}

export function loadUserFromEmail(email) {
  const url = `${HOST}/api/users/email/${email}`;

  return dispatch => {
    dispatch(requestUserFromEmail());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => {
        if (response.ok) {
          response.json().then((json) => {
            return dispatch(receiveUserFromEmail(json));
          });
        } else {
          return dispatch(receiveUserFromEmailNotFound());
        }
      })
      .catch((err) => {
        console.log('Failed to retrieve user by email for email:', email, 'err:', err);
      });
  };
}

export function userTypingEmail() {
  return {
    type: USER_TYPING_EMAIL,
  };
}


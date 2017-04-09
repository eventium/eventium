import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

import {
  REQUEST_USER_INVITES,
  RECEIVE_USER_INVITES,
  REQUEST_USER_EVENTS,
  RECEIVE_USER_EVENTS,
  RECEIVE_DELETE_USER_INVITE,
  REQUEST_USER_PROFILE,
  RECEIVE_USER_PROFILE,
  UPDATE_USER_PROFILE_REQUEST,
  UPDATE_USER_PROFILE_RESPONSE,
} from '../constants';

const HOST = 'http://localhost:3000';

// -------------------------------------------------------------------------------------------------
// GET /api/users/${userId}/profile
// -------------------------------------------------------------------------------------------------

function requestUserProfile(userId) {
  return {
    type: REQUEST_USER_PROFILE,
    user: {
      id: userId,
      email: '',
      first_name: '',
      last_name: '',
      description: '',
      picture: '',
    },
  };
}

function receiveUserProfile(json) {
  return {
    type: RECEIVE_USER_PROFILE,
    user: {
      id: json.id,
      email: json.email,
      first_name: json.first_name,
      last_name: json.last_name,
      description: json.description,
      picture: json.picture,
    },
  };
}

export function loadUserProfile(userId) {
  const url = `${HOST}/api/users/${userId}/profile/`;
  const options = {};

  options.method = 'GET';
  options.credentials = 'same-origin';

  return (dispatch) => {
    dispatch(requestUserProfile(userId));

    return fetch(url, options)
      .then(response => response.json())
      .then(json => dispatch(receiveUserProfile(json)));
  };
}

// -------------------------------------------------------------------------------------------------
// POST /api/users/${userId}/profile
// -------------------------------------------------------------------------------------------------

function updateUserProfileRequest(profile) {
  return {
    type: UPDATE_USER_PROFILE_REQUEST,
    user: profile,
  };
}

function updateUserProfileResponse(json) {
  return {
    type: UPDATE_USER_PROFILE_RESPONSE,
    user: {
      id: json.id,
      email: json.email,
      first_name: json.first_name,
      last_name: json.last_name,
      description: json.description,
      picture: json.picture,
    },
  };
}

export function updateUserProfile(userId, formData) {
  const form = new FormData();
  const url = `${HOST}/api/users/${userId}/profile/`;
  const options = {};
  const profile = {};

  for (let i = 0; i < formData.length; i += 1) {
    const name = formData[i].getAttribute('name');
    const value = formData[i].value;

    if (name === 'picture' && formData[i].files.length > 0) {
      const file = formData[i].files[0];

      form.append(name, file);
    } else {
      form.append(name, value);
    }
  }

  options.method = 'POST';
  options.body = form;
  options.credentials = 'same-origin';

  return (dispatch) => {
    dispatch(updateUserProfileRequest(profile));

    return fetch(url, options)
      .then(response => response.json())
      .then(json => dispatch(updateUserProfileResponse(json)));
  };
}

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

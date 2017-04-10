import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

import {
  REQUEST_INDIVIDUAL_EVENT,
  RECEIVE_INDIVIDUAL_EVENT,
  RECEIVE_INDIVIDUAL_EVENT_FAILURE,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_RESPONSE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_RESPONSE,
  REQUEST_EVENT_MEMBERS,
  RECEIVE_EVENT_MEMBERS,
  REQUEST_EVENT_INVITES,
  RECEIVE_EVENT_INVITES,
  USER_ALREADY_PART_OF_THE_EVENT,
} from '../constants';

const HOST = 'http://localhost:3000';

// -------------------------------------------------------------------------------------------------
// GET /api/events/:id
// -------------------------------------------------------------------------------------------------

function requestEvent(id) {
  return {
    type: REQUEST_INDIVIDUAL_EVENT,
    event: {
      id: parseInt(id, 10),
      title: '',
      location: '',
      address: '',
      city: '',
      province: '',
      postal_code: '',
      description: '',
      image: '',
      start_time: '',
      end_time: '',
    },
  };
}

function receiveEvent(id, json) {
  return {
    type: RECEIVE_INDIVIDUAL_EVENT,
    event: {
      id: parseInt(id, 10),
      title: json.title,
      location: json.location,
      address: json.address,
      city: json.city,
      province: json.province,
      postal_code: json.postal_code,
      description: json.description,
      image: json.image,
      start_time: json.start_time,
      end_time: json.end_time,
    },
  };
}

function failedToReceiveEvent(error) {
  return {
    type: RECEIVE_INDIVIDUAL_EVENT_FAILURE,
    error,
  };
}

export function loadEvent(id) {
  const url = `${HOST}/api/events/${id}`;

  return (dispatch) => {
    dispatch(requestEvent());

    return fetch(url, { credentials: 'same-origin' })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw 'Unauthorized';
        } else {
          throw JSON.stringify(response.body);
        }
      })
      .then((json) => {
        dispatch(receiveEvent(id, json));
      }).catch((err) => {
        dispatch(failedToReceiveEvent(`Failed to retrieve event ${id}:\n${err}`));
      });
  };
}

// -------------------------------------------------------------------------------------------------
// POST /api/events/
// -------------------------------------------------------------------------------------------------

function createEventRequest(event) {
  return {
    type: CREATE_EVENT_REQUEST,
    event: event,
  };
}

function createEventResponse(json) {
  return {
    type: CREATE_EVENT_RESPONSE,
    event: {
      id: json.id,
      title: json.title,
      location: json.location,
      address: json.address,
      city: json.city,
      province: json.province,
      postal_code: json.postal_code,
      description: json.description,
      image: json.image,
      start_time: json.start_time,
      end_time: json.end_time,
    },
  };
}

export function createEvent(formData, userId, resolve) {
  const url = `${HOST}/api/events`;
  const form = new FormData();
  const options = {};
  const event = {};

  for (let i = 0; i < formData.length; i += 1) {
    const name = formData[i].getAttribute('name');
    const value = formData[i].value;

    if (name === 'image') {
      const file = formData[i].files[0];

      form.append(name, file);
    } else {
      form.append(name, value);
    }
  }

  form.append('userId', userId);

  options.method = 'POST';
  options.credentials = 'same-origin';
  options.body = form;

  return (dispatch) => {
    dispatch(createEventRequest(event));

    return fetch(url, options)
    .then(response => response.json())
    .then((json) => {
      dispatch(createEventResponse(json));
      resolve(json.id);
    });
  };
}

// -------------------------------------------------------------------------------------------------
// PUT /api/events/
// -------------------------------------------------------------------------------------------------

function updateEventRequest(event) {
  return {
    type: UPDATE_EVENT_REQUEST,
    event: event,
  };
}

function updateEventResponse(json) {
  return {
    type: UPDATE_EVENT_RESPONSE,
    event: {
      id: json.id,
      title: json.title,
      location: json.location,
      address: json.address,
      city: json.city,
      province: json.province,
      postal_code: json.postal_code,
      description: json.description,
      image: json.image,
      start_time: json.start_time,
      end_time: json.end_time,
    },
  };
}

export function updateEvent(formData, eventId) {
  const form = new FormData();
  const options = {};
  const event = {};

  for (let i = 0; i < formData.length; i += 1) {
    const name = formData[i].getAttribute('name');
    const value = formData[i].value;

    if (name === 'image' && formData[i].files.length > 0) {
      const file = formData[i].files[0];

      form.append(name, file);
    } else {
      form.append(name, value);
    }
  }

  const url = `${HOST}/api/events/${eventId}`;

  options.method = 'PUT';
  options.body = form;
  options.credentials = 'same-origin';

  return (dispatch) => {
    dispatch(updateEventRequest(event));

    return fetch(url, options)
    .then(response => response.json())
    .then(json => dispatch(updateEventResponse(json)));
  };
}


// -------------------------------------------------------------------------------------------------
// GET /api/events/{id}/members
// -------------------------------------------------------------------------------------------------

function requestEventMembers() {
  return {
    type: REQUEST_EVENT_MEMBERS,
  };
}

function receiveEventMembers(json) {
  return {
    type: RECEIVE_EVENT_MEMBERS,
    json,
  };
}

export function loadEventMembers(eventId) {
  const url = `${HOST}/api/events/${eventId}/members/`;

  return (dispatch) => {
    dispatch(requestEventMembers());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveEventMembers(json));
      }).catch((err) => {
        console.log('failed to retrieve event members', eventId, 'with err:', err);
      });
  };
}


// -------------------------------------------------------------------------------------------------
// GET /api/events/{id}/invites
// -------------------------------------------------------------------------------------------------


function requestEventInvites() {
  return {
    type: REQUEST_EVENT_INVITES,
  };
}

function receiveEventInvites(json) {
  return {
    type: RECEIVE_EVENT_INVITES,
    json,
  };
}

export function loadEventInvites(eventId) {
  const url = `${HOST}/api/events/${eventId}/invites/`;

  return (dispatch) => {
    dispatch(requestEventInvites());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then((json) => {
        dispatch(receiveEventInvites(json));
      }).catch((err) => {
        console.log('failed to retrieve event invites', eventId, 'with err:', err);
      });
  };
}

// -------------------------------------------------------------------------------------------------
// POST /event/:id/invites/
// -------------------------------------------------------------------------------------------------

function userAlreadyPartOfTheEvent() {
  return {
    type: USER_ALREADY_PART_OF_THE_EVENT,
  };
}
export function createEventInvite(eventId, guestId, hostId) {
  const url = `${HOST}/api/events/${eventId}/invites/`;

  const message = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ eventId, guestId, hostId }),
  };

  return (dispatch) => {
    return fetch(url, message)
      .then((response) => {
        if (response.ok) {
          return dispatch(loadEventInvites(eventId));
        } else if (response.status === 403) {
          return dispatch(userAlreadyPartOfTheEvent());
        }
      })
      .catch(err => dispatch(signupFailed(err)));
  };
}


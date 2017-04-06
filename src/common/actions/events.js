import fetch from 'isomorphic-fetch';
import FormData from 'form-data';

import {
  REQUEST_EVENTS,
  RECEIVE_EVENTS,
  REQUEST_INDIVIDUAL_EVENT,
  RECEIVE_INDIVIDUAL_EVENT,
  CREATE_EVENT_REQUEST,
  CREATE_EVENT_RESPONSE,
  UPDATE_EVENT_REQUEST,
  UPDATE_EVENT_RESPONSE,
} from '../constants';

const HOST = 'http://localhost:3000';

// -------------------------------------------------------------------------------------------------
// GET /api/events/
// -------------------------------------------------------------------------------------------------

function requestEvents() {
  return {
    type: REQUEST_EVENTS,
    events: [],
  };
}

function receiveEvents(json) {
  return {
    type: RECEIVE_EVENTS,
    events: json.events,
  };
}

export function loadEvents() {
  const url = `${HOST}/api/events/`;
  let options = {};

  return dispatch => {
    dispatch(requestEvents());

    options.method = 'GET';
    options.credentials = 'same-origin';

    return fetch(url, options)
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      .catch((err) => {
        dispatch(receiveEvents({ events: [] }));
        console.log('failed to retrieve events');
      });
  };
}


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

export function loadEvent(id) {
  const url = `${HOST}/api/events/${id}`;

  return dispatch => {
    dispatch(requestEvent());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(receiveEvent(id, json)))
      .catch((err) => {
        dispatch(receiveEvents({ event: {} }));
        console.log('failed to retrieve event');
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

export function createEvent(formData) {
  const url = `${HOST}/api/events`;
  let form = new FormData();
  let options = {};
  let event = {};

  for (let i = 0; i < formData.length; i += 1) {
    const name = formData[i].getAttribute('name');
    const value = formData[i].value;

    if(name === 'image') {
      const file = formData[i].files[0];

      form.append(name, file)
    }
    else {
      form.append(name, value);
    }
  }

  options.method = 'POST';
  options.body = form;

  return dispatch => {
    dispatch(createEventRequest(event));

    return fetch(url, options)
    .then(response => response.json())
    .then(json => dispatch(createEventResponse(json)));
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

export function updateEvent(formData) {
  let form = new FormData();
  let options = {};
  let event = {};
  let id;

  for (let i = 0; i < formData.length; i += 1) {
    const name = formData[i].getAttribute('name');
    const value = formData[i].value;

    if(name === 'image') {
      const file = formData[i].files[0];

      form.append(name, file)
    }
    else {
      form.append(name, value);
    }
  }

  id = form.get('id');

  const url = `${HOST}/api/events/${id}`;

  options.method = 'PUT';
  options.body = form;

  return dispatch => {
    dispatch(updateEventRequest(event));

    return fetch(url, options)
    .then(response => response.json())
    .then(json => dispatch(updateEventResponse(json)));
  };
}
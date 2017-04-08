import fetch from 'isomorphic-fetch';

import {
  REQUEST_INDIVIDUAL_EVENT,
  RECEIVE_INDIVIDUAL_EVENT,
} from '../constants';

const HOST = 'http://localhost:3000';


// -------------------------------------------------------------------------------------------------
// GET /api/events/:id
// -------------------------------------------------------------------------------------------------

function requestEvent(id) {
  return {
    type: REQUEST_INDIVIDUAL_EVENT,
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
  };
}

function receiveEvent(id, json) {
  return {
    type: RECEIVE_INDIVIDUAL_EVENT,
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

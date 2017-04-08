import fetch from 'isomorphic-fetch';

import {
  REQUEST_INVITES,
  RECEIVE_INVITES,
} from '../constants';

const HOST = 'http://localhost:3000';


// -------------------------------------------------------------------------------------------------
// GET /api/invites/
// -------------------------------------------------------------------------------------------------

function requestEvents() {
  return {
    type: REQUEST_INVITES,
  };
}

function receiveEvents(json) {
  return {
    type: RECEIVE_INVITES,
    json,
  };
}

export function loadInvites() {
  const url = `${HOST}/api/invites/`;

  return dispatch => {
    dispatch(requestEvents());

    return fetch(url, { credentials: 'same-origin' })
      .then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      .catch((err) => {
        dispatch(receiveEvents({ events: [] }));
        console.log('Failed to retrieve invites:', err);
      });
  };
}

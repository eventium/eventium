import fetch from 'isomorphic-fetch';

import * as types from '../constants';

const HOST = 'http://localhost:3000';


// -------------------------------------------------------------------------------------------------
// GET /api/events/
// -------------------------------------------------------------------------------------------------


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

export function fetchMessages() {
  const url = `${HOST}/api/messages/`;

  return dispatch => {
    dispatch(requestMessages());

    return fetch(url)
      .then(response => response.json())
      .then(json => dispatch(receiveMessages(json)));
  };
}

export function receiveRawMessage(message) {
  return {
    type: types.RECEIVE_MESSAGE,
    message,
  };
}

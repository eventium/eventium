import fetch from 'isomorphic-fetch';
import {
  REQUEST_SESSION,
  RECEIVE_SESSION,
} from '../constants';

const HOST = 'http://localhost:3000';

// -------------------------------------------------------------------------------------------------
// POST /api/login/
// -------------------------------------------------------------------------------------------------
function requestSession() {
  return {
    type: REQUEST_SESSION,
  };
}

function receiveSession(json) {
  return {
    type: RECEIVE_SESSION,
    token: json.token,
  };
}

export default function login(username, password) {
  const url = `${HOST}/api/login/`;
  const message = {
    method: 'POST',
    body: { username, password },
  };
  return (dispatch) => {
    dispatch(requestSession());
    return fetch(url, message)
      .then(response => response.json())
      .then(json => dispatch(receiveSession(json)));
  };
}

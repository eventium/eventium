import fetch from 'isomorphic-fetch';
import {
  REQUEST_SESSION,
  RECEIVE_SESSION,
  FAILED_TO_LOGIN,
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

function failedToLogin(err) {
  const message = (err.toString ? err.toString() : JSON.stringify(err));
  return {
    type: FAILED_TO_LOGIN,
    message,
  };
}

export default function login(username, password) {
  const url = `${HOST}/login`;
  const message = {
    method: 'POST',
    body: { username, password },
  };
  return (dispatch) => {
    dispatch(requestSession());
    return fetch(url, message)
      .then((response) => {
        // console.log('login response received');
        return response.json();
      })
      .then((json) => {
        // console.log('dispatching RECEIVE_SESSION');
        return dispatch(receiveSession(json));
      })
      .catch((err) => {
        // console.log(`login error: ${err}`);
        return dispatch(failedToLogin(err));
      });
  };
}

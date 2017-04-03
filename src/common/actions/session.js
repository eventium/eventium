import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
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

function receiveSession() {
  return {
    type: RECEIVE_SESSION,
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
  const url = `${HOST}/api/login`;
  const message = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ username, password }),
  };

  return (dispatch) => {
    dispatch(requestSession());
    return fetch(url, message)
      .then((response) => {
        if (response.ok) {
          dispatch(receiveSession());
          browserHistory.push('/');
        } else {
          dispatch(failedToLogin('Username or password is incorrect.'));
        }
      })
      .catch((err) => {
        dispatch(failedToLogin(err));
      });
  };
}

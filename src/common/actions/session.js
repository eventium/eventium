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

function receiveSession(user) {
  return {
    type: RECEIVE_SESSION,
    user,
  };
}

function failedToLogin(err) {
  const message = (err.toString ? err.toString() : JSON.stringify(err));
  return {
    type: FAILED_TO_LOGIN,
    message,
  };
}

export default function login(email, password) {
  const url = `${HOST}/api/login`;
  const message = {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
    body: JSON.stringify({ email, password }),
  };

  return (dispatch) => {
    dispatch(requestSession());
    return fetch(url, message)
      .then((response) => {
        if (response.ok) {
          return response.json().then((json) => {
            dispatch(receiveSession(json));
            browserHistory.push('/');
          });
        } else if (response.status === 401) {
          dispatch(failedToLogin('Email is not registered or password is incorrect.'));
        } else if (response.status >= 500) {
          dispatch(failedToLogin('Server error.'));
        } else {
          throw `Unexpected response: ${response.status}`;
        }
      })
      .catch((err) => {
        dispatch(failedToLogin(err));
      });
  };
}

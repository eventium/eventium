import fetch from 'isomorphic-fetch';
import {
  REQUEST_SESSION,
  RECEIVE_SESSION,
  FAILED_TO_LOGIN,
  REDIRECT_TO_LOGIN,
} from '../constants';

const HOST = 'http://localhost:3000';

// -------------------------------------------------------------------------------------------------
// POST /api/login
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

function failedToLogin(error) {
  return {
    type: FAILED_TO_LOGIN,
    error,
  };
}

export function login(email, password) {
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
          return response.json()
            .then(json => dispatch(receiveSession(json)));
        } else if (response.status === 401) {
          return dispatch(failedToLogin('Email is not registered or password is incorrect.'));
        } else if (response.status >= 500) {
          return dispatch(failedToLogin('Server error.'));
        }
        return Promise.reject(`Unexpected response: ${response.status}`);
      })
      .catch(err => dispatch(failedToLogin(err)));
  };
}

// -------------------------------------------------------------------------------------------------
// GET /api/session
// -------------------------------------------------------------------------------------------------
export function fetchSession() {
  const url = `${HOST}/api/session`;
  const message = {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'same-origin',
  };

  return (dispatch) => {
    dispatch(requestSession());
    return fetch(url, message)
      .then((response) => {
        if (response.ok) {
          return response.json()
            .then(json => dispatch(receiveSession(json)));
        }
        return dispatch(failedToLogin());
      })
      .catch(err => dispatch(failedToLogin(`fetchSession error: ${err}`)));
  };
}

// Other
function loginRedirect() {
  return {
    type: REDIRECT_TO_LOGIN,
  };
}
export function redirectToLogin(browserHistory) {
  return (dispatch) => {
    dispatch(loginRedirect());
    return Promise.resolve().then(function() {
      browserHistory.push('/login');
    });
  };
}

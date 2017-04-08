import fetch from 'isomorphic-fetch';
import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
} from '../constants';

const HOST = 'http://localhost:3000';

function requestSignup() {
  return {
    type: SIGNUP_REQUEST,
  };
}

function signupSuccessful() {
  return {
    type: SIGNUP_SUCCESS,
  };
}

export function signupFailed(error) {
  return {
    type: SIGNUP_FAILURE,
    error,
  };
}

export function signup(email, password) {
  const url = `${HOST}/api/user`;
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
    dispatch(requestSignup());
    return fetch(url, message)
      .then((response) => {
        if (response.ok) {
          return dispatch(signupSuccessful());
        } else if (response.status === 409) {
          return dispatch(signupFailed('User already exists.'));
        }
        return dispatch(signupFailed('Server error.'));
      })
      .catch(err => dispatch(signupFailed(err)));
  };
}

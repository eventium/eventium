import * as constants from '../constants';

export default function signupState(state = { status: constants.SIGNUP_IDLE }, action) {
  switch (action.type) {
    case constants.SIGNUP_REQUEST: {
      return {
        status: constants.SIGNUP_PENDING,
      };
    }
    case constants.SIGNUP_SUCCESS: {
      return {
        status: constants.SIGNUP_IDLE,
        message: 'Sign up is successful',
      };
    }
    case constants.SIGNUP_FAILURE: {
      return {
        status: constants.SIGNUP_IDLE,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

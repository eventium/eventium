import * as constants from '../constants';

function session(state = { status: constants.SESSION_STATUS_LOGGED_OUT }, action) {
  switch (action.type) {
    case constants.REQUEST_SESSION: {
      return {
        status: constants.SESSION_STATUS_PENDING,
      };
    }
    case constants.RECEIVE_SESSION: {
      return {
        status: constants.SESSION_STATUS_LOGGED_IN,
        user: action.user,
      };
    }
    case constants.FAILED_TO_LOGIN: {
      return {
        status: constants.SESSION_STATUS_LOGGED_OUT,
        error: action.error,
      };
    }
    default: {
      return state;
    }
  }
}

export default session;

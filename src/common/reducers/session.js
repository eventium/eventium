import * as constants from '../constants';

function session(state = { status: constants.SESSION_STATUS_LOGGED_OUT }, action) {
  switch (action.type) {
    case constants.REQUEST_SESSION: {
      return {
        status: constants.SESSION_STATUS_PENDING,
        redirect: state.redirect,
      };
    }
    case constants.RECEIVE_SESSION: {
      return {
        status: constants.SESSION_STATUS_LOGGED_IN,
        user: action.user,
        redirect: state.redirect,
      };
    }
    case constants.FAILED_TO_LOGIN: {
      return {
        status: constants.SESSION_STATUS_LOGGED_OUT,
        error: action.error,
        redirect: state.redirect,
      };
    }
    case constants.REDIRECT_TO_LOGIN: {
      return {
        status: constants.SESSION_STATUS_LOGGED_OUT,
        redirect: action.fromPath,
      };
    }
    case constants.REQUEST_LOGOUT: {
      return Object.assign(state, {
        status: constants.SESSION_STATUS_PENDING,
      });
    }
    case constants.DELETE_SESSION: {
      return {
        status: constants.SESSION_STATUS_LOGGED_OUT,
      };
    }
    case constants.FAILED_TO_LOGOUT: {
      return Object.assign(state, {
        status: constants.SESSION_STATUS_LOGGED_IN,
        error: action.error,
      });
    }
    default: {
      return state;
    }
  }
}

export default session;

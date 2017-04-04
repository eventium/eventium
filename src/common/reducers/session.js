import * as constants from '../constants';

function session(state = { state: 'idle' }, action) {
  switch (action.type) {
    case constants.REQUEST_SESSION: {
      return {
        status: 'requesting',
      };
    }
    case constants.RECEIVE_SESSION: {
      return {
        status: 'received',
        user: action.user,
      };
    }
    case constants.FAILED_TO_LOGIN: {
      return Object.assign({}, {
        status: 'error',
        message: action.message,
      });
    }
    default: {
      return state;
    }
  }
}

export default session;

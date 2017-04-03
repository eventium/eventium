import * as constants from '../constants';

function session(state = { state: 'idle' }, action) {
  switch (action.type) {
    case constants.REQUEST_SESSION: {
      return {
        state: 'requesting',
      };
    }
    case constants.RECEIVE_SESSION: {
      return {
        state: 'received',
      };
    }
    case constants.FAILED_TO_LOGIN: {
      return Object.assign({}, {
        state: 'error',
        message: action.message,
      });
    }
    default: {
      return state;
    }
  }
}

export default session;

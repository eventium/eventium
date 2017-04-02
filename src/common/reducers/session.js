import * as constants from '../constants';

function session(state = {}, action) {
  switch (action.type) {
    case constants.REQUEST_SESSION: {
      return {};
    }
    case constants.RECEIVE_SESSION: {
      return { token: action.token };
    }
    default: {
      return state;
    }
  }
}

export default session;

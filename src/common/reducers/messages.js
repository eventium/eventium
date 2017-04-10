import * as constants from '../constants';

const initialState = {
  loaded: false,
  data: [],
};

export const messages = (state = initialState, action) => {
  switch (action.type) {
    case constants.ADD_MESSAGE:
      return Object.assign({}, state, {
        data: [...state.data, action.message],
      });
    case constants.RECEIVE_MESSAGE:
      return Object.assign({}, state, {
        data: [...state.data, action.message],
      });
    case constants.LOAD_MESSAGES:
      return Object.assign({}, initialState, {
        loading: true,
      });
    case constants.LOAD_MESSAGES_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        loaded: true,
        data: action.json,
      });
    default:
      return state;
  }
};

import * as constants from '../constants';

const initialState = {
  data: [],
};

export const members = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECEIVE_EVENT_MEMBERS: {
      return Object.assign({}, state, {
        data: [...state.data, ...action.json],
      });
    }
    default:
      return state;
  }
};

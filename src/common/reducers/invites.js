import * as constants from '../constants';

const initialState = {
  data: [],
};

export const invites = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECEIVE_INVITES: {
      return { data: action.json };
    }
    default:
      return state;
  }
};

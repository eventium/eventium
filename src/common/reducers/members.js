import * as constants from '../constants';

const initialState = {
  members: [],
  invites: [],
};

export const members = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECEIVE_EVENT_MEMBERS: {
      return Object.assign({}, state, {
        members: action.json,
        invites: state.invites,
      });
    }
    case constants.RECEIVE_EVENT_INVITES: {
      return Object.assign({}, state, {
        members: state.members,
        invites: action.json,
      });
    }
    default:
      return state;
  }
};

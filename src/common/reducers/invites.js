import * as constants from '../constants';

const initialState = {
  data: [],
};

export const invites = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECEIVE_USER_INVITES: {
      return { data: action.json };
    }
    case constants.RECEIVE_DELETE_USER_INVITE: {
      return Object.assign({}, {
        data: state.data.filter(invite => (invite.id !== action.inviteId))
      });
    }
    case constants.RECEIVE_EVENT_INVITES: {
      return Object.assign({}, state, {
        data: [...state.data, ...action.json],
      });
    }
    default:
      return state;
  }
};

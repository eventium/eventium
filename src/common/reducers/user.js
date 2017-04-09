import * as constants from '../constants';

const initialState = {
  data: {},
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECEIVE_USER_FROM_EMAIL: {
      return Object.assign({}, {
        data: action.json,
        found: true,
      });
    }
    case constants.RECEIVE_USER_FROM_EMAIL_NOT_FOUND: {
      return Object.assign({}, {
        data: {},
        notFound: true,
      });
    }
    case constants.USER_TYPING_EMAIL: {
      return Object.assign({}, initialState);
    }
    default:
      return state;
  }
};

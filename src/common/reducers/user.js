import * as constants from '../constants';

const initialState = {
  data: {},
  userExists: false,
};

export const user = (state = initialState, action) => {
  switch (action.type) {
    case constants.RECEIVE_USER_FROM_EMAIL: {
      return Object.assign({}, {
        data: action.json,
        found: true,
        userExists: false,
      });
    }
    case constants.RECEIVE_USER_FROM_EMAIL_NOT_FOUND: {
      return Object.assign({}, {
        data: {},
        notFound: true,
        userExists: false,
      });
    }
    case constants.USER_TYPING_EMAIL: {
      return Object.assign({}, initialState);
    }
    case constants.USER_ALREADY_PART_OF_THE_EVENT: {
      return Object.assign({}, {
        data: {},
        notFound: true,
        userExists: true,
      });
    }
    default:
      return state;
  }
};

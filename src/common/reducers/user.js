import {
  RECEIVE_USER_PROFILE,
  UPDATE_USER_PROFILE_RESPONSE,
} from '../constants';

const initialUserState = {
  id: 0,
  email: '',
  first_name: '',
  last_name: '',
  description: '',
  picture: '',
};

export const user = (state = initialUserState, action) => {
  switch (action.type) {
    case RECEIVE_USER_PROFILE: {
      return Object.assign({}, action.user);
    }
    case UPDATE_USER_PROFILE_RESPONSE: {
      return Object.assign({}, action.user);
    }
    default: {
      return state;
    }
  }
};

import * as constants from '../constants';

export const events = (state = [], action) => {
  switch (action.type) {
    case constants.RECEIVE_EVENTS: {
      return action.events;
    }
    case constants.CREATE_EVENT_RESPONSE: {
      return Object.assign({}, state, {
        events: [
          ...state.events,
          action.event,
        ],
      });
    }
    default:
      return state;
  }
};

export const event = (state = {}, action) => {
  switch (action.type) {
    case constants.RECEIVE_INDIVIDUAL_EVENT: {
      return Object.assign({}, action.event);
    }
    case constants.UPDATE_EVENT_RESPONSE: {
      return Object.assign({}, action.event);
    }
    default:
      return state;
  }
};

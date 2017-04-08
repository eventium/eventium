import * as constants from '../constants';

const initialEventState = {
  event: {
    address: '',
    city: '',
    description: '',
    end_time: '',
    id: 0,
    image: '',
    location: '',
    postal_code: '',
    province: '',
    start_time: '',
    title: '',
  },
};

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

export const event = (state = initialEventState, action) => {
  switch (action.type) {
    case constants.RECEIVE_INDIVIDUAL_EVENT: {
      return {
        event: Object.assign({}, action.event),
      };
    }
    case constants.UPDATE_EVENT_RESPONSE: {
      return {
        event: Object.assign({}, action.event),
      };
    }
    default: {
      return initialEventState;
    }
  }
};

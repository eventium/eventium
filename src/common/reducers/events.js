import * as constants from '../constants';

const initialEventsState = {
  data: [],
};

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

export const events = (state = initialEventsState, action) => {
  switch (action.type) {
    case constants.RECEIVE_USER_EVENTS: {
      return { data: action.json };
    }
    case constants.CREATE_EVENT_RESPONSE: {
      return Object.assign(state, {
        data: [...state.data, action.event],
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
    case constants.UPDATE_EVENT_REQUEST: {
      return {
        event: Object.assign({}, state.event.event, action.event),
      };
    }
    case constants.UPDATE_EVENT_RESPONSE: {
      return {
        event: Object.assign({}, action.event),
      };
    }
    case constants.RECEIVE_INDIVIDUAL_EVENT_FAILURE: {
      return {
        event: {},
        error: action.error,
      };
    }
    default: {
      return initialEventState;
    }
  }
};

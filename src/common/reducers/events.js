import * as constants from '../constants';

export const events = (state = [], action) => {
  switch (action.type) {
    case constants.RECEIVE_EVENTS: {
      return action.events;
    }
    default:
      return state;
  }
};

export const event = (state = {}, action) => {
  switch (action.type) {
    case constants.RECEIVE_INDIVIDUAL_EVENT: {
      return Object.assign({}, {
        id: action.id,
        title: action.title,
        location: action.location,
        address: action.address,
        city: action.city,
        province: action.province,
        postal_code: action.postal_code,
        description: action.description,
        image: action.image,
        start_time: action.start_time,
        end_time: action.end_time,
      });
    }
    default:
      return state;
  }
};
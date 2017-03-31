import { combineReducers } from 'redux';
import { event, events } from './events';

const rootReducers = combineReducers({
  events,
  event,
});

export default rootReducers;

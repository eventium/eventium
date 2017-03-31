import { combineReducers } from 'redux';
import { event, events } from './events';
import { messages } from './messages';

const rootReducers = combineReducers({
  events,
  event,
});

export default rootReducers;

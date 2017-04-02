import { combineReducers } from 'redux';
import { event, events } from './events';
import session from './session';

const rootReducers = combineReducers({
  session,
  events,
  event,
});

export default rootReducers;

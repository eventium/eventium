import { combineReducers } from 'redux';
import { event, events } from './events';
import { messages } from './messages';
import session from './session';


const rootReducers = combineReducers({
  session,
  events,
  event,
  messages,
});

export default rootReducers;

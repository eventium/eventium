import { combineReducers } from 'redux';
import { event, events } from './events';
import { messages } from './messages';
import session from './session';
import signupState from './signupState';


const rootReducers = combineReducers({
  session,
  signupState,
  events,
  event,
  messages,
});

export default rootReducers;

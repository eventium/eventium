import { combineReducers } from 'redux';
import { event, events } from './events';
import { messages } from './messages';
import { invites } from './invites';
import session from './session';


const rootReducers = combineReducers({
  session,
  events,
  event,
  messages,
  invites,
});

export default rootReducers;

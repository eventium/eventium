import { combineReducers } from 'redux';
import { event, events } from './events';
import { messages } from './messages';
import { invites } from './invites';
import { members } from './members';
import { user, userProfile } from './user';
import session from './session';
import signupState from './signupState';

const rootReducers = combineReducers({
  session,
  signupState,
  events,
  event,
  messages,
  invites,
  members,
  user,
  userProfile,
});

export default rootReducers;

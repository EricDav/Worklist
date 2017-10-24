import { combineReducers } from 'redux';

import { user, errorMessage, isApiCallInProgress } from './AuthReducers';

export default combineReducers({
  user,
  errorMessage,
  isApiCallInProgress
});


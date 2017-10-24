import { combineReducers } from 'redux';

import { user, errorMessage, isApiCallInProgress,
  homePageFormNumber } from './AuthReducers';

export default combineReducers({
  user,
  errorMessage,
  isApiCallInProgress,
  homePageFormNumber
});


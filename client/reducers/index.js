import { combineReducers } from 'redux';

import { user, errorMessage, isApiCallInProgress,
  homePageFormNumber } from './AuthReducers';
import { resetPasswordUser } from './UserReducers';
import { todolists } from './TodolistReducers';

export default combineReducers({
  user,
  errorMessage,
  isApiCallInProgress,
  homePageFormNumber,
  resetPasswordUser,
  todolists
});


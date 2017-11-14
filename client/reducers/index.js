import { combineReducers } from 'redux';

import { user, errorMessage, apiCallInProgress,
  homePageFormNumber } from './AuthReducers';
import { resetPasswordUser, users, isSmallScreenSize,
  googleUser, reminders } from './UserReducers';
import { todolists, currentTodolist, rightSideNav } from './TodolistReducers';

export default combineReducers({
  user,
  users,
  errorMessage,
  apiCallInProgress,
  homePageFormNumber,
  resetPasswordUser,
  todolists,
  currentTodolist,
  rightSideNav,
  isSmallScreenSize,
  googleUser,
  reminders
});


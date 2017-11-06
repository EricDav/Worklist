import { combineReducers } from 'redux';

import { user, errorMessage, isApiCallInProgress,
  homePageFormNumber } from './AuthReducers';
import { resetPasswordUser, users, isSmallScreenSize,
  googleUser } from './UserReducers';
import { todolists, currentTodolist, rightSideNav } from './TodolistReducers';

export default combineReducers({
  user,
  users,
  errorMessage,
  isApiCallInProgress,
  homePageFormNumber,
  resetPasswordUser,
  todolists,
  currentTodolist,
  rightSideNav,
  isSmallScreenSize,
  googleUser
});


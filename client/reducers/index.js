import { combineReducers } from 'redux';

import { currentUser, errorMessage, apiCallInProgress,
  homePageFormNumber } from './AuthReducers';
import { resetPasswordUser, getUsers, isSmallScreenSize,
  googleData, reminders } from './UserReducers';
import { todolists, currentTodolist, rightSideNav } from './TodolistReducers';

const users = getUsers;

export default combineReducers({
  currentUser,
  users,
  errorMessage,
  apiCallInProgress,
  homePageFormNumber,
  resetPasswordUser,
  todolists,
  currentTodolist,
  rightSideNav,
  isSmallScreenSize,
  googleData,
  reminders
});


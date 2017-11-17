import { RESET_USER_PASSWORD, SET_USERS,
  SCREEN_SIZE, SET_GOOGLE_USER, SET_REMINDERS } from '../actions/ActionTypes';

/**
 *@description Reducer for resetting user password
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const resetPasswordUser = (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_USER_PASSWORD:
      return action.resetPasswordUser;
    default:
      return state;
  }
};

/**
 *@description Reducer for retrieving users
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const getUsers = (state = [], action = {}) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};

/**
 *@description Reducer that determine the screen of a device
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const isSmallScreenSize = (state = false, action = {}) => {
  switch (action.type) {
    case SCREEN_SIZE:
      return action.screenSize;
    default:
      return state;
  }
};

/**
 *@description Reducer that holds the google user info
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const googleData = (
  state = { fullName: '', email: '' },
  action = {}
) => {
  switch (action.type) {
    case SET_GOOGLE_USER:
      return action.userData;
    default:
      return state;
  }
};

/**
 *@description Reducer for retrieving reminders
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const reminders = (state = [], action = {}) => {
  switch (action.type) {
    case SET_REMINDERS:
      return action.reminders;
    default:
      return state;
  }
};

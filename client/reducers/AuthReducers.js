import { SET_CURRENT_USER, SET_ERROR_MESSAGE,
  API_CALL_IN_PROGRESS,
  SET_HOME_PAGE_FORM } from '../actions/ActionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

/**
 *@description Reducer for creating or authenticating user
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const currentUser = (state = initialState, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        isAuthenticated: action.user.currentUser.email !== undefined,
        user: action.user
      };
    default:
      return state;
  }
};

/**
 *@description Reducer for error message
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const errorMessage = (state = '', action = {}) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        message: action.message
      };
    default:
      return state;
  }
};
/**
 *@description Reducer for an api call that is in progress
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const apiCallInProgress = (state = false, action = {}) => {
  switch (action.type) {
    case API_CALL_IN_PROGRESS:
      return action.status;
    default:
      return state;
  }
};

/**
 *@description Reducer to determine which form shows in the home page
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const homePageFormNumber = (state = 1, action = {}) => {
  switch (action.type) {
    case SET_HOME_PAGE_FORM:
      return action.formNumber;
    default:
      return state;
  }
};

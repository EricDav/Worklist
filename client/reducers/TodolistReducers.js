import { SET_TODOLISTS, ADD_TODOLIST, SET_CURRENT_TODOLIST,
  UPDATE_TODOLIST, SHOW_RIGHT_SIDE_NAV } from '../actions/ActionTypes';
import { updateTodolists } from '../helpers';

/**
 *@description Reducer for retrieving todolist
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const todolists = (state = [], action = {}) => {
  switch (action.type) {
    case SET_TODOLISTS:
      return action.todolists;
    case ADD_TODOLIST:
      return [
        ...state,
        action.todolist
      ];
    case UPDATE_TODOLIST:
      return updateTodolists(state, action.updatedTodolist);
    default:
      return state;
  }
};

/**
 *@description Reducer for setting the current todolist
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const currentTodolist = (state = {}, action = {}) => {
  switch (action.type) {
    case SET_CURRENT_TODOLIST:
      return action.currentTodolist;
    case UPDATE_TODOLIST:
      return action.updatedTodolist;
    default:
      return state;
  }
};

/**
 *@description Reducer that determines what show in the right side nav
 *
 * @param  {Object} state The initial state
  * @param  {Object} action The dispatched action
 *
 * @return {Object} the current state
 */
export const rightSideNav = (state = 0, action = {}) => {
  switch (action.type) {
    case SHOW_RIGHT_SIDE_NAV:
      return action.formNumber;
    default:
      return state;
  }
};

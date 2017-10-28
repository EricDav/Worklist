import { SET_TODOLISTS, ADD_TODOLIST } from '../actions/ActionTypes';

export const todolists = (state = [], action = {}) => {
  switch (action.type) {
    case SET_TODOLISTS:
      return action.todolists;
    case ADD_TODOLIST:
      return [
        ...state,
        action.todolist
      ];
    default:
      return state;
  }
};

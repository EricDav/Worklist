import { RESET_USER_PASSWORD } from '../actions/ActionTypes';

export const resetPasswordUser = (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_USER_PASSWORD:
      return action.resetPasswordUser;
    default:
      return state;
  }
};

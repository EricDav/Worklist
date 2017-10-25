import { RESET_PASSWORD_USER } from '../actions/ActionTypes';

export const resetPasswordUser = (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_PASSWORD_USER:
      return action.resetPasswordUser;
    default:
      return state;
  }
};

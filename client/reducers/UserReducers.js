import { RESET_USER_PASSWORD, SET_USERS,
  SCREEN_SIZE, SET_GOOGLE_USER } from '../actions/ActionTypes';

export const resetPasswordUser = (state = {}, action = {}) => {
  switch (action.type) {
    case RESET_USER_PASSWORD:
      return action.resetPasswordUser;
    default:
      return state;
  }
};

export const users = (state = [], action = {}) => {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
};

export const isSmallScreenSize = (state = false, action = {}) => {
  switch (action.type) {
    case SCREEN_SIZE:
      return action.screenSize;
    default:
      return state;
  }
};

export const googleUser = (state = {fullName: '', email: ''}, action = {}) => {
  switch (action.type) {
    case SET_GOOGLE_USER:
      return action.userData;
    default:
      return state;
  }
};

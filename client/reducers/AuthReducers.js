import { SET_CURRENT_USER, SET_ERROR_MESSAGE,
  SET_IS_API_CALL_IN_PROGRESS,
  SET_HOME_PAGE_FORM } from '../actions/ActionTypes';

const initialState = {
  isAuthenticated: false,
  currentUser: {}
};

export const user = (state = initialState, action = {}) => {
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

export const isApiCallInProgress = (state = false, action = {}) => {
  switch (action.type) {
    case SET_IS_API_CALL_IN_PROGRESS:
      return action.status;
    default:
      return state;
  }
};

export const homePageFormNumber = (state = 1, action = {}) => {
  switch (action.type) {
    case SET_HOME_PAGE_FORM:
      return action.formNumber;
    default:
      return state;
  }
};

import expect from 'expect';
import * as AuthActions from '../../actions/AuthActions';
import * as AuthReducers from '../../reducers/AuthReducers';
import * as ActionTypes from '../../actions/ActionTypes';

describe('Auth Reducer', () => {
  it('should set the current user when passed with SET_CURRENT_USER', () => {
    const initialState = {
      isAuthenticated: false,
      user: {
        currentUser: {
          userName: '',
          fullName: ''
        }
      }
    };
    const user = {
      currentUser: {
        userName: 'Pythagoras',
        fullName: 'Alienyi David',
        phoneNumber: '07010724574',
        email: 'alienyidavid@gmail.com'
      }
    };
    const action = {
      type: ActionTypes.SET_CURRENT_USER,
      user
    };
    const newState = AuthReducers.user(initialState, action);
    expect(newState.isAuthenticated).toEqual(true);
    expect(newState.user.currentUser.userName).toEqual('Pythagoras');
    expect(newState.user.currentUser.email).toEqual('alienyidavid@gmail.com');
  });
  it('should return initial state for invalid type', () => {
    const initialState = {
      isAuthenticated: false,
      user: {
        currentUser: {
          userName: '',
          fullName: ''
        }
      }
    };
    const user = {
      currentUser: {
        userName: 'Pythagoras',
        fullName: 'Alienyi David',
        phoneNumber: '07010724574',
        email: 'alienyidavid@gmail.com'
      }
    };
    const action = {
      type: 'WRONG',
      user
    };
    const newState = AuthReducers.user(initialState, action);
    expect(newState.isAuthenticated).toEqual(false);
    expect(newState.user.currentUser.userName).toEqual('');
  });
  it('should set error message when passed with SET_ERROR_MESSAGE', () => {
    const message = 'invalid username';
    const action = {
      type: ActionTypes.SET_ERROR_MESSAGE,
      message
    };
    const newState = AuthReducers.errorMessage('', action);
    expect(newState.message).toEqual('invalid username');
  });
  it('should return initial state for invalid set error message type', () => {
    const message = 'invalid username';
    const action = {
      type: 'Invalid_set_error_message_type',
      message
    };
    const newState = AuthReducers.errorMessage('', action);
    expect(newState).toEqual('');
  });
  it('should return a number when passed with SET_HOME_PAGE_FORM', () => {
    const formNumber = 2
    const action = {
      type: ActionTypes.SET_HOME_PAGE_FORM,
      formNumber
    };
    const newState = AuthReducers.homePageFormNumber(1, action);
    expect(newState).toEqual(2);
  });
  it('should return initial state for invalid set home page form type', () => {
    const initialState = 1;
    const formNumber = 3;
    const action = {
      type: 'Invalid_set_homepageform_type',
      formNumber
    };
    const newState = AuthReducers.homePageFormNumber(initialState, action);
    expect(newState).toEqual(initialState);
  });
});

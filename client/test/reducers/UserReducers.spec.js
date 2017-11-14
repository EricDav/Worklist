import expect from 'expect';

import * as UserReducers from '../../reducers/UserReducers';
import * as ActionTypes from '../../actions/ActionTypes';

describe('Auth Reducer', () => {
  it(`should return an abject that reset password user email
  when passed with RESET_USER_PASSWORD`, () => {
      const resetPasswordUser = {
        email: 'alienyidavid@gmail.com'
      };
      const action = {
        type: ActionTypes.RESET_USER_PASSWORD,
        resetPasswordUser
      };
      const newState = UserReducers.resetPasswordUser({}, action);
      expect(newState.email).toEqual('alienyidavid@gmail.com');
    });
  it('should return an empty object for inalid reset password type', () => {
    const user = {
      email: 'alienyidavid@gmail.com'
    };
    const action = {
      type: 'INVALID_RESET_USER_PASSWORD',
      user
    };
    const newState = UserReducers.resetPasswordUser({}, action);
    expect(Object.keys(newState).length).toEqual(0);
  });
  it('should return an array when passed with SET_USERS', () => {
    const users = [
      {
        userName: 'Pythagoras',
        fullName: 'Alienyi David',
        phoneNumber: '07010724574',
        email: 'alienyidavid@gmail.com'
      }
    ];
    const action = {
      type: ActionTypes.SET_USERS,
      users
    };
    const newState = UserReducers.users([], action);
    expect(newState.length).toEqual(1);
    expect(newState[0].email).toEqual('alienyidavid@gmail.com');
  });
  it('should return initial state for invalid set users type', () => {
    const users = [
      {
        userName: 'Pythagoras',
        fullName: 'Alienyi David',
        phoneNumber: '07010724574',
        email: 'alienyidavid@gmail.com'
      }
    ];
    const action = {
      type: 'Invalid_set_users_type',
      users
    };
    const newState = UserReducers.users([], action);
    expect(newState).toEqual([]);
  });
  it('should return a boolean when passed with SCREEN_SIZE', () => {
    const screenSize = true;
    const action = {
      type: ActionTypes.SCREEN_SIZE,
      screenSize
    };
    const newState = UserReducers.isSmallScreenSize(false, action);
    expect(newState).toEqual(true);
  });
  it('should return false for invalid screen size type', () => {
    const screenSize = true;
    const action = {
      type: 'INVALID_SCREEN_SIZE_TYPE',
      screenSize
    };
    const newState = UserReducers.isSmallScreenSize(false, action);
    expect(newState).toEqual(false);
  });
  it(`should return an abject that contain google user email and fullname
  when passed with SET_GOOGLE_USER`, () => {
      const userData = {
        email: 'alienyidavid@gmail.com',
        fullName: 'Alienyi David'
      };
      const initialState = { fullName: '', email: '' };
      const action = {
        type: ActionTypes.SET_GOOGLE_USER,
        userData
      };
      const newState = UserReducers.googleUser(initialState, action);
      expect(newState.email).toEqual('alienyidavid@gmail.com');
      expect(newState.fullName).toEqual('Alienyi David');
    });
  it('should return an empty object for inalid reset password type', () => {
    const initialState = { fullName: '', email: '' };
    const userData = {
      email: 'alienyidavid@gmail.com',
      fullName: 'Alienyi David'
    };
    const action = {
      type: 'INVALID_GOOGLE_USER_TYPE',
      userData
    };
    const newState = UserReducers.googleUser(initialState, action);
    expect((newState).email).toEqual('');
    expect((newState).fullName).toEqual('');
  });
});

import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as UserActions from '../../actions/UserActions';
import * as ActionTypes from '../../actions/ActionTypes';
import localstorageMock from './mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

window.localStorage = localstorageMock;

describe('User actions', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it(`should create RESET_USER_PASSWORD when a user send secret
  code successfully`, () => {
      const response = {
        data: {
          message: {
            fullName: 'Alienyi David',
            userName: 'Pythagoras',
            id: 1,
          }
        },
        success: true
      };
      const resetPasswordUser = {
        fullName: 'Alienyi David',
        userName: 'Pythagoras',
        id: 1
      };
      axios.post = jest.fn(() => Promise.resolve(response));
      const expectedActions = [
        { type: ActionTypes.API_CALL_IN_PROGRESS, status: true },
        { type: ActionTypes.RESET_USER_PASSWORD, resetPasswordUser },
        { type: ActionTypes.API_CALL_IN_PROGRESS, status: false },
        { type: ActionTypes.SET_HOME_PAGE_FORM, formNumber: 4 }];
      const store = mockStore({ resetPasswrodUser: {} });

      return store.dispatch(UserActions.sendSecretCode())
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  it('should creates SET_ERROR_MESSAGE send secret code failed', () => {
    const errorResponse = {
      response: {
        data: {
          error: { message: 'An error occured' }
        },
        success: true
      }
    };
    const resetPasswordUser = {
      fullName: 'Alienyi David',
      userName: 'Pythagoras',
      id: 1,
    };
    axios.post = jest.fn(() => Promise.reject(errorResponse));
    const expectedActions = [
      { type: ActionTypes.API_CALL_IN_PROGRESS, status: true },
      { type: ActionTypes.SET_ERROR_MESSAGE, message: 'An error occured' },
      { type: ActionTypes.API_CALL_IN_PROGRESS, status: false }];
    const store = mockStore({ resetPasswrodUser: {} });

    return store.dispatch(UserActions.sendSecretCode(resetPasswordUser))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it(`should creates RESET_USER_PASSWORD  when users reset their password
    successfully`, () => {
      const response = {
        data: {
          data: {
            fullName: 'Alienyi David',
            userName: 'Pythagoras',
            id: 1,
          }
        },
        success: true
      };
      const payload = {
        fullName: 'Alienyi David',
        userName: 'Pythagoras',
        id: 1,
      };
      axios.patch = jest.fn(() => Promise.resolve(response));
      const expectedActions = [
        { type: ActionTypes.API_CALL_IN_PROGRESS, status: true },
        { type: ActionTypes.SET_HOME_PAGE_FORM, formNumber: 1 },
        { type: ActionTypes.RESET_USER_PASSWORD, resetPasswordUser: {} },
        { type: ActionTypes.API_CALL_IN_PROGRESS, status: false },
      ];
      const store = mockStore({ resetPasswrodUser: {} });

      return store.dispatch(UserActions.resetPassword(payload))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  it('should creates SET_ERROR_MESSAGE  when reset password failed', () => {
    const errorResponse = {
      response: {
        data: {
          error: { message: 'An error occured' }
        },
        success: true
      }
    };
    axios.patch = jest.fn(() => Promise.reject(errorResponse));
    const expectedActions = [
      { type: ActionTypes.API_CALL_IN_PROGRESS, status: true },
      { type: ActionTypes.SET_ERROR_MESSAGE, message: 'An error occured' },
      { type: ActionTypes.API_CALL_IN_PROGRESS, status: false }];
    const store = mockStore({ resetPasswrodUser: {} });

    return store.dispatch(UserActions.resetPassword())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should creates SET_GOOGLE_USER when googlesignin is called', () => {
    const response = {
      data: {
        message: 'New user'
      },
      success: true
    };
    axios.post = jest.fn(() => Promise.resolve(response));
    const userData = {
      email: 'dad@we.com'
    };
    const expectedActions = [
      { type: ActionTypes.SET_GOOGLE_USER, userData },
      { type: ActionTypes.SET_HOME_PAGE_FORM, formNumber: 5 }];
    const store = mockStore({ resetPasswrodUser: {} });

    return store.dispatch(UserActions.googleSignin(userData))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should creates SET_USER when getUsers is called', () => {
    const response = {
      data: {
        users: [{
          fullName: 'Bola amin',
          userName: 'pyth',
          email: 'sad@we.com'
        }]
      },
      success: true
    };
    axios.get = jest.fn(() => Promise.resolve(response));
    const userData = {
      fullName: 'Bola amin',
      userName: 'pyth',
      email: 'sad@we.com'
    };
    const expectedActions = [
      { type: ActionTypes.SET_USERS, users: [userData] }];
    const store = mockStore({ resetPasswrodUser: {} });

    return store.dispatch(UserActions.getUsers('a', true))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

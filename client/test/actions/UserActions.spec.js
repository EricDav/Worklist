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
  it('should creates RESET_USER_PASSWORD  when users reset password successfully', () => {
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
    const resetPasswordUser = {
      fullName: 'Alienyi David',
      userName: 'Pythagoras',
      id: 1,
    };
    axios.post = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
      { type: ActionTypes.RESET_USER_PASSWORD, resetPasswordUser },
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false },
      { type: ActionTypes.SET_HOME_PAGE_FORM, formNumber: 4 }];
    const store = mockStore({ resetPasswrodUser: {} });

    return store.dispatch(UserActions.sendSecretCode(resetPasswordUser))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should creates SET_ERROR_MESSAGE  when reset password', () => {
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
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
      { type: ActionTypes.SET_ERROR_MESSAGE, message: 'An error occured' },
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false }];
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
      axios.put = jest.fn(() => Promise.resolve(response));
      const expectedActions = [
        { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
        { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false }];
      const store = mockStore({ resetPasswrodUser: {} });

      return store.dispatch(UserActions.resetPassword(payload))
        .then(() => {
          expect(store.getActions()).toEqual(expectedActions);
        });
    });
  it('should creates SET_ERROR_MESSAGE  when reset password', () => {
    const errorResponse = {
      response: {
        data: {
          error: { message: 'An error occured' }
        },
        success: true
      }
    };
    const payload = {
      fullName: 'Alienyi David',
      userName: 'Pythagoras',
      id: 1,
    };
    axios.put = jest.fn(() => Promise.reject(errorResponse));
    const expectedActions = [
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
      { type: ActionTypes.SET_ERROR_MESSAGE, message: 'An error occured' },
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false }];
    const store = mockStore({ resetPasswrodUser: {} });

    return store.dispatch(UserActions.resetPassword(payload))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  // it(`should creates RESET_USER_PASSWORD  when users reset their password
  //   successfully`, () => {
  //     const response = {
  //       data: {
  //         data: {
  //           fullName: 'Alienyi David',
  //           userName: 'Pythagoras',
  //           id: 1,
  //         }
  //       },
  //       success: true
  //     };
  //     jwt = {
  //       decode: jest.fn(() => Promise.resolve(response))
  //     };
  //     const payload = {
  //       file: 'Alienyi David image',
  //       name: 'Pythagoras',
  //     };
  //     axios.patch = jest.fn(() => Promise.resolve(response));
  //     const expectedActions = [
  //       { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
  //       { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false }];
  //     const store = mockStore({ currentUser: {} });

  //     return store.dispatch(UserActions.updateProfilePicture(payload))
  //       .then(() => {
  //         expect(store.getActions()).toEqual(expectedActions);
  //       });
  //   });
  // it('should creates SET_CURRENT_USER when change their profile picture', () => {
  //   const errorResponse = {
  //     response: {
  //       data: {
  //         error: { message: 'An error occured' }
  //       },
  //       success: true
  //     }
  //   };
  //   const payload = {
  //     fullName: 'Alienyi David',
  //     userName: 'Pythagoras',
  //     id: 1,
  //   };
  //   axios.patch = jest.fn(() => Promise.reject(errorResponse));
  //   const expectedActions = [
  //     { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
  //     { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false }];
  //   const store = mockStore({ resetPasswrodUser: {} });

  //   return store.dispatch(UserActions.updateProfilePicture(payload))
  //     .then(() => {
  //       expect(store.getActions()).toEqual(expectedActions);
  //     });
  // });
});

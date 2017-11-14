import expect from 'expect';

import * as AuthActions from '../../actions/AuthActions';
import * as ActionTypes from '../../actions/ActionTypes';
import localstorageMock from './mock';


window.localStorage = localstorageMock;

describe('Auth actions', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should create SET_CURRENT_USER', () => {
    const user = {
      fullName: 'Alienyi David',
      userName: 'Pyth',
      email: 'dav@we.com',
    };
    const expectedAction = {
      type: ActionTypes.SET_CURRENT_USER,
      user
    };
    expect(AuthActions.setCurrentUser(user)).toEqual(expectedAction);
  });
  it('should create API_CALL_IN_PROGRESS', () => {
    const status = false;
    const expectedAction = {
      type: ActionTypes.API_CALL_IN_PROGRESS,
      status
    };
    expect(AuthActions.setIsApiCall(status)).toEqual(expectedAction);
  });
  it('should create SET_ERROR_MESSAGE', () => {
    const message = 'Invalid email';
    const expectedAction = {
      type: ActionTypes.SET_ERROR_MESSAGE,
      message
    };
    expect(AuthActions.setError(message)).toEqual(expectedAction);
  });
});

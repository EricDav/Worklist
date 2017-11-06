import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as TodolistActions from '../../actions/TodolistActions';
import * as ActionTypes from '../../actions/ActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Todolist actions', () => {
  beforeEach(() => {
    global.Materialize = { toast: () => {} };
  });
  it('should creates SET_TODOLISTS when a user retrieve all todolists', () => {
    const response = {
      data: {
        data: [{
          name: 'Woorklist',
          tasks: [],
          collaborators: ['Pythagoras']
        }]
      },
      success: true
    };
    const todolists = [{
      name: 'Woorklist',
      tasks: [],
      collaborators: ['Pythagoras']
    }];
    axios.get = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
      { type: ActionTypes.SET_TODOLISTS, todolists }];
    const store = mockStore({ todolists: [] });

    return store.dispatch(TodolistActions.getTodolist())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
  it('should creates ADD_TODOLIST when a user create a todolist', () => {
    const response = {
      data: {
        data: {
          name: 'Woorklist',
          tasks: [],
          collaborators: ['Pythagoras']
        }
      },
      success: true
    };
    const todolist = {
      name: 'Woorklist',
      tasks: [],
      collaborators: ['Pythagoras']
    };
    axios.post = jest.fn(() => Promise.resolve(response));
    const expectedActions = [
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: true },
      { type: ActionTypes.SET_IS_API_CALL_IN_PROGRESS, status: false },
      { type: ActionTypes.ADD_TODOLIST, todolist },
      { type: ActionTypes.SET_ERROR_MESSAGE, message: '' }];
    const store = mockStore({ todolists: [] });

    return store.dispatch(TodolistActions.createTodolist())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});

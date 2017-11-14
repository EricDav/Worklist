import expect from 'expect';

import * as TodolistReducers from '../../reducers/TodolistReducers';
import * as ActionTypes from '../../actions/ActionTypes';

describe('Auth Reducer', () => {
  it('should return an array when passed with SET_TODOLISTS', () => {
    const todolists = [
      {
        name: 'postIt',
        tasks: [],
        collaborators: ['pythagoras']
      }
    ];
    const action = {
      type: ActionTypes.SET_TODOLISTS,
      todolists
    };
    const newState = TodolistReducers.todolists([], action);
    expect(newState.length).toEqual(1);
    expect(newState[0].name).toEqual('postIt');
    expect(newState[0].tasks.length).toEqual(0);
    expect(newState[0].collaborators[0]).toEqual('pythagoras');
  });
  it(`should return an array which contain the
  initial and the added todolist when passed with ADD_TODOLISTS`, () => {
      const initialState = [
        {
          _id: '12345wxyz',
          name: 'postIt',
          tasks: [],
          collaborators: ['pythagoras']
        }
      ];
      const todolist =
        {
          _id: '12345wxyz',
          name: 'worklist',
          tasks: [],
          collaborators: ['pythagoras']
        };
      const action = {
        type: ActionTypes.ADD_TODOLIST,
        todolist
      };
      const newState = TodolistReducers.todolists(initialState, action);
      expect(newState.length).toEqual(2);
      expect(newState[0].name).toEqual('postIt');
      expect(newState[1].name).toEqual('worklist');
    });
  it(`should return an updated todolist when
    passed with UPDATE_TODOLIST`, () => {
      const initialCurrentTodolist = {
        _id: '12345wxyz',
        name: 'postIt',
        tasks: [],
        collaborators: ['pythagoras']
      };
      const initialTodolists = [
        {
          _id: '12345wxyz',
          name: 'postIt',
          tasks: [],
          collaborators: ['pythagoras']
        }
      ];
      const updatedTodolist = {
        _id: '12345wxyz',
        name: 'postIt',
        tasks: [{
          priority: 'normal',
          assignTo: 'David',
          date: '2017-11-08T18:03:27.477Z',
          name: 'signup',
          reminder: '2017-11-08T18:03:27.477Z'
        }],
        collaborators: ['pythagoras']
      };
      const action = {
        type: ActionTypes.UPDATE_TODOLIST,
        updatedTodolist
      };
      const todolistsNewState = TodolistReducers
        .todolists(initialTodolists, action);
      const currentTodolistNewState = TodolistReducers
        .currentTodolist(initialCurrentTodolist, action);
      expect(todolistsNewState[0].tasks.length).toEqual(1);
      expect(todolistsNewState[0].tasks[0].name).toEqual('signup');
      expect(currentTodolistNewState.tasks.length).toEqual(1);
    });
  it('should return initial state for invalid todolist type', () => {
    const initialTodolist = [];
    const initialCurrentTodolist = {};
    const initialRightSideNav = 0;
    const state = 8;
    const action = {
      type: 'INVALID_TYPE',
      state
    };
    const todolistNewState = TodolistReducers
      .todolists(initialTodolist, action);
    const currentTodolistNewState = TodolistReducers
      .currentTodolist(initialCurrentTodolist, action);
    const rightSideNavNewState = TodolistReducers
      .rightSideNav(initialRightSideNav, action);

    expect(todolistNewState).toEqual(initialTodolist);
    expect(currentTodolistNewState).toEqual(initialCurrentTodolist);
    expect(rightSideNavNewState).toEqual(initialRightSideNav);
  });
  it('should return an object when passed with SET_CURRENT_TODOLIST', () => {
    const currentTodolist =
      {
        _id: '12345wxyz',
        name: 'postIt',
        tasks: [],
        collaborators: ['pythagoras']
      };
    const action = {
      type: ActionTypes.SET_CURRENT_TODOLIST,
      currentTodolist
    };
    const newState = TodolistReducers.currentTodolist({}, action);
    expect(newState.name).toEqual('postIt');
    expect(newState.collaborators[0]).toEqual('pythagoras');
  });
  it('should return an number when passed with SHOW_RIGHT_SIDE_NAV', () => {
    const formNumber = 2;
    const action = {
      type: ActionTypes.SHOW_RIGHT_SIDE_NAV,
      formNumber
    };
    const newState = TodolistReducers.rightSideNav(1, action);
    expect(newState).toEqual(2);
  });
});

import axios from 'axios';

import { SET_TODOLISTS, ADD_TODOLIST,
  SET_CURRENT_TODOLIST, UPDATE_TODOLIST,
  SHOW_RIGHT_SIDE_NAV, API_CALL_IN_PROGRESS } from './ActionTypes';
import { setError } from './AuthActions';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * @description Request to the API to fetch todolist
 *
 * @return {object} returns object
 */
export function getTodolist() {
  setAuthorizationToken(localStorage.jwtToken);
  return dispatch => axios.get('/api/v1/todos').then((res) => {
    const { todolists } = res.data;
    dispatch({
      type: SET_TODOLISTS,
      todolists
    });
  })
    .catch(({ response }) => {
      const { message } = response.data.error;
      if (['Failed to authenticate token.', 'No token provided']
        .includes(message)) {
        Materialize.toast('Your session has expired', 2000, 'red');
        window.location = '/';
        localStorage.removeItem('jwtToken');
      }
    });
}

/**
 * @description determines what shows in the right side nav
 *
 * @param {Number} formNumber the form number
 *
 * @return {Object} returns dispatch object
 */
export function showRightSideNav(formNumber) {
  return (dispatch) => {
    dispatch({
      type: SHOW_RIGHT_SIDE_NAV,
      formNumber
    });
  };
}

/**
 * @description Request to the API to create a todolist
 *
 *@param {Array} todolists list of all todo
 *@param {Number} todoId id of the current todolist
 *
 * @return {object} returns dispatch object
 */
export function setCurrentTodolist(todolists, todoId) {
  let currentTodolist;
  todolists.forEach((todolist) => {
    if (todolist._id === todoId) {
      currentTodolist = todolist;
    }
  });
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_TODOLIST,
      currentTodolist
    });
  };
}
/**
 * @description Request to the API to create todolist
 *
 *@param {object} payload todo payload
 *
 * @return {object} returns object
 */
export function createTodolist(payload) {
  setAuthorizationToken(localStorage.jwtToken);
  return (dispatch) => {
    dispatch({
      type: API_CALL_IN_PROGRESS,
      status: true
    });
    return axios.post('/api/v1/todos', payload).then((res) => {
      dispatch({
        type: API_CALL_IN_PROGRESS,
        status: false
      });
      const { todolist } = res.data;
      dispatch({
        type: ADD_TODOLIST,
        todolist
      });
      dispatch(setError(''));
      Materialize.toast('Todolist created successfully', 2000, 'green');
    });
  };
}

/**
 * @description Request to the API to create a task for a todolist
 *
 *@param {object} payload task details
 *@param {Number} todoId id of the todolist
 *
 * @return {object} returns dispatch object
 */
export function createTaskForTodolist(payload, todoId) {
  setAuthorizationToken(localStorage.jwtToken);
  return (dispatch) => {
    dispatch({
      type: API_CALL_IN_PROGRESS,
      status: true
    });
    return axios.post(`/api/v1/todos/${todoId}/tasks`, payload)
      .then((res) => {
        const { todolist } = res.data;
        dispatch({
          type: UPDATE_TODOLIST,
          updatedTodolist: todolist
        });
        dispatch(setError(''));
        dispatch(showRightSideNav(1));
        dispatch({
          type: API_CALL_IN_PROGRESS,
          status: false
        });
        Materialize.toast('Task created successfully', 2000, 'green');
      })
      .catch(({ response }) => {
        const { message } = response.data.error;
        if (message) {
          if (['Failed to authenticate token.', 'No token provided']
            .includes(message)) {
            Materialize.toast('Your session has expired');
            window.location = '/';
            localStorage.removeItem('jwtToken');
            return;
          }
          dispatch(setError(message));
        } else {
          dispatch(setError(`An unexpected error occured.
         You can check your internet connection`));
        }
        dispatch({
          type: API_CALL_IN_PROGRESS,
          status: false
        });
      });
  };
}

/**
 * @description Request to the API to add a user to a todolist
 *
 *@param {Object} payload user details
 *@param {Number} todoId id of the todolist
 *
 * @return {Object} returns dispatch object
 */
export function addContributorToTodolist(payload, todoId) {
  setAuthorizationToken(localStorage.jwtToken);
  return dispatch => axios.post(`/api/v1/todos/${todoId}/contributors`, payload)
    .then((res) => {
      const { todolist } = res.data;
      dispatch({
        type: UPDATE_TODOLIST,
        updatedTodolist: todolist
      });
      Materialize.toast('User added succesfully', 2000, 'green');
    })
    .catch(({ response }) => {
      const { message } = response.error;
      if (['Failed to authenticate token.', 'No token provided']
        .includes(message)) {
        Materialize.toast('Your session has expired');
        window.location = '/';
        localStorage.removeItem('jwtToken');
      }
    });
}

/**
 * @description Request to the API to complete a task
 *
 *@param {Object} taskId id of the task to be completed
 *@param {Number} todoId id of the todolist
 @param {Object} payload object containing the task nae
 *
 * @return {object} returns dispatch object
 */
export function completeTask(taskId, todoId, payload) {
  setAuthorizationToken(localStorage.jwtToken);
  return dispatch =>
    axios.patch(`/api/v1/todos/${todoId}/tasks/${taskId}`, payload)
      .then((res) => {
        const { todolist } = res.data;
        dispatch({
          type: UPDATE_TODOLIST,
          updatedTodolist: todolist
        });
        Materialize.toast('Task has been completed', 2000, 'green');
      }).catch(({ response }) => {
        const { message } = response.error;
        if (['Failed to authenticate token.', 'No token provided']
          .includes(message)) {
          Materialize.toast('Your session has expired');
          window.location = '/';
          localStorage.removeItem('jwtToken');
          return;
        }
        Materialize.toast('An error occured', 2000, 'red');
      });
}

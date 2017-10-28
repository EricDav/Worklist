import axios from 'axios';

import { SET_TODOLISTS, ADD_TODOLIST } from './ActionTypes';
import { setIsApiCallInProgress, setError } from './AuthActions';

/**
 * @description Request to the API to fetch todolist
 *
 * @return {object} returns object
 */
export function getTodolist() {
  return (dispatch) => {
    axios.get('/api/v1/todos').then((res) => {
      const { data } = res.data;
      dispatch({
        type: SET_TODOLISTS,
        todolists: data
      });
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
  return (dispatch) => {
    dispatch(setIsApiCallInProgress(true));
    return axios.post('/api/v1/todos', payload).then((res) => {
      dispatch(setIsApiCallInProgress(false));
      const { data } = res.data;
      dispatch({
        type: ADD_TODOLIST,
        todolist: data
      });
      $('#modal1').modal('close');
      Materialize.toast('Todolist created successfully', 2000, 'green');
    }).catch(({ response }) => {
      const { message } = response.data.error;
      if (message) {
        dispatch(setError(message));
      } else {
        dispatch(setError(`An unexpected error occured.
         You can check your internet connection`));
      }
      dispatch(setIsApiCallInProgress(false));
    });
  };
}

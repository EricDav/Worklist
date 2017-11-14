import axios from 'axios';
import jwt from 'jsonwebtoken';

import setAuthorizationToken from '../utils/setAuthorizationToken';
import { SET_CURRENT_USER, SET_ERROR_MESSAGE,
  API_CALL_IN_PROGRESS, SET_HOME_PAGE_FORM } from './ActionTypes';

/**
 * @description set the current user
 *
 * @param  {object} user current user object
 *
 * @return {object} dispatch object
 */
export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

/**
 * @description action that show that an api call is in progress
 *
 * @param  {object} status status of the api call
 *
 * @return {object} dispatch object
 */
export function setIsApiCall(status) {
  return {
    type: API_CALL_IN_PROGRESS,
    status
  };
}

/**
 * @description set form error value
 *
 * @param  {array} message response error
 *
 * @return {object} dispatch object
 */
export function setError(message) {
  return {
    type: SET_ERROR_MESSAGE,
    message
  };
}

/**
 * @description set form error value
 *
 * @param  {array} formNumber response error
 *
 * @return {object} dispatch object
 */
export function showHomePageForm(formNumber) {
  if (formNumber < 4) {
    localStorage.setItem('homePageNum', formNumber);
  }
  return dispatch => dispatch({
    type: SET_HOME_PAGE_FORM,
    formNumber
  });
}

/**
 * @description Request to the API to register a user
 *
 * @param  {object} payload the user deatils to be saved
 *
 * @return {object} dispatch object
 */
export function userSignupRequest(payload) {
  return (dispatch) => {
    dispatch({
      type: API_CALL_IN_PROGRESS,
      status: true
    });
    axios.post('/api/v1/users', payload).then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch({
        type: API_CALL_IN_PROGRESS,
        status: false
      });
      window.location = '/dashboard';
    }).catch(({ response }) => {
      const { message } = response.data.error;
      if (message) {
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
 * @description Request to the API to register a user
 *
 * @param  {object} payload the user deatils to be saved
 *
 * @return {object} dispatch object
 */
export function userSigninRequest(payload) {
  return (dispatch) => {
    dispatch({
      type: API_CALL_IN_PROGRESS,
      status: true
    });
    axios.post('/api/v1/users/signin', payload)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        dispatch({
          type: API_CALL_IN_PROGRESS,
          status: false
        });
        window.location = 'dashboard';
      })
      .catch(({ response }) => {
        const { message } = response.data.error;
        if (message) {
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
 * @description Sign out user by removing jwt token from local storage
 *
 * @return {object} dispatch object
 */
export function logout() {
  return (dispatch) => {
    localStorage.removeItem('jwtToken');
    setAuthorizationToken(false);
    dispatch(setCurrentUser({
      currentUser: {
        userName: '',
        fullName: ''
      }
    }));
  };
}

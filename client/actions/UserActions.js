import axios from 'axios';
import FormData from 'form-data';
import jwt from 'jsonwebtoken';

import { setIsApiCall, setError,
  showHomePageForm, setCurrentUser } from './AuthActions';
import { RESET_USER_PASSWORD, SET_USERS, SCREEN_SIZE,
  SET_GOOGLE_USER, SET_REMINDERS } from './ActionTypes';
import setAuthorizationToken from '../utils/setAuthorizationToken';

/**
 * @description set the user requesting for reset password
 *
 * @param  {object} resetPasswordUser details of the user resetting password
 *
 * @return {object} returns object
 */
export function setForgetPasswordUser(resetPasswordUser) {
  return {
    type: RESET_USER_PASSWORD,
    resetPasswordUser
  };
}

/**
 * @description Request to the API to send verification code
 *
 * @param  {Object} payload an object which contain the user email address
 *
 * @return {Object} returns object
 */
export function sendSecretCode(payload) {
  return (dispatch) => {
    dispatch(setIsApiCall(true));
    return axios.post('/api/v1/users/send-secret-code', payload).then((res) => {
      dispatch(setForgetPasswordUser(res.data.data));
      dispatch(setIsApiCall(false));
      dispatch(showHomePageForm(4));
      Materialize.toast('A code has been sent to your mail', 2500, 'green');
    }).catch(({ response }) => {
      const { message } = response.data.error;
      if (message) {
        dispatch(setError(message));
      } else {
        dispatch(setError(`An unexpected error occured.
         You can check your internet connection`));
      }
      dispatch(setIsApiCall(false));
    });
  };
}

/**
 * @description reset user password
 *
 * @param  {object} payload user payload
 *
 * @return {object} returns dispatch object
 */
export function resetPassword(payload) {
  return (dispatch) => {
    dispatch(setIsApiCall(true));
    return axios.patch('/api/v1/users/reset-password', payload).then((res) => {
      Materialize.toast('Password reset successfully', 2000, 'green');
      dispatch(showHomePageForm(1));
      dispatch(setForgetPasswordUser({}));
      dispatch(setIsApiCall(false));
    }).catch(({ response }) => {
      const { message } = response.data.error;
      if (message) {
        dispatch(setError(message));
      } else {
        dispatch(setError(`An unexpected error occured.
         You can check your internet connection`));
      }
      dispatch(setIsApiCall(false));
    });
  };
}

/**
 * @description reset user password
 *
 * @param  {object} payload user payload
 *
 * @return {object} returns dispatch object
 */
export function updateProfilePicture(payload) {
  const data = new FormData();
  data.append('file', payload, payload.name);
  return (dispatch) => {
    dispatch(setIsApiCall(true));
    return axios.patch('/api/v1/users', data, {
      headers: {
        accept: 'application/json',
        'Accept-Language': 'en-US,en;q=0.8',
        'Content-Type': `multipart/form-data; boundary=${data._boundary}`
      }
    }).then((res) => {
      const { token } = res.data;
      localStorage.setItem('jwtToken', token);
      setAuthorizationToken(token);
      dispatch(setCurrentUser(jwt.decode(token)));
      dispatch(setIsApiCall(false));
    }).catch(({ response }) => {
      const { message } = response.data.error;
      if (message) {
        Materialize.toast(message, 300, red);
      } else {
        Materialize.toast(`Could not upload image. An unexpected 
        error occured`, 300, red);
      }
      dispatch(setIsApiCall(false));
    });
  };
}

/**
 * @description requesty to the API to get users
 *
 * @param  {String} parameter searched parameter
 * @param {Boolean} isValidParam determines if a parameter is valid
 *
 * @return {object} returns dispatch object
 */
export function getUsers(parameter, isValidParam) {
  if (isValidParam) {
    return dispatch => axios.get(`/api/v1/users/?searchParam=${parameter}`)
      .then((res) => {
        const { data } = res.data;
        dispatch({
          type: SET_USERS,
          users: data
        });
      }).catch(() => {
        Materialize.toast('An error occured. Could not add user', 2000, red);
      });
  }
  return dispatch => dispatch({
    type: SET_USERS,
    users: []
  });
}


/**
 * @description Request to API to update user profile
 *
 * @param  {object} payload user payload
 *
 * @return {object} returns dispatch object
 */
export function updateUserProfile(payload) {
  return (dispatch) => {
    dispatch(setIsApiCall(true));
    return axios.put('/api/v1/users', payload)
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        dispatch(setIsApiCall(false));
        Materialize.toast('User profile updated successfully', 300, 'green');
      })
      .catch(({ response }) => {
        const { message } = response.data.error;
        if (message) {
          dispatch(setError(message));
        } else {
          Materialize.toast('An unexpected error occured retry', 300, 'red');
        }
        dispatch(setIsApiCall(false));
      });
  };
}

/**
 * @description checks for small screen size
 *
 * @param  {number} screenSize
 *
 * @return {object} returns object
 */
export function smallScreenSize(screenSize) {
  return (dispatch) => {
    dispatch({
      type: SCREEN_SIZE,
      screenSize
    });
  };
}

/**
 * @description Request to the API to signin a user with google+
 *
 * @param  {Object} userData the details of the google user
 *
 * @return {Object} returns object
 */
export function googleSignin(userData) {
  return dispatch =>
    axios.post('/api/v1/users/google-signin', userData).then((res) => {
      if (res.data.data === 'New user') {
        dispatch({
          type: SET_GOOGLE_USER,
          userData
        });
        dispatch(showHomePageForm(5));
      } else {
        const { token } = res.data;
        localStorage.setItem('jwtToken', token);
        setAuthorizationToken(token);
        dispatch(setCurrentUser(jwt.decode(token)));
        window.location = 'dashboard';
      }
    });
}

/**
 * @description Request to the API to get all reminders
 *
 * @param  {Object} userData the details of the google user
 *
 * @return {Object} returns object
 */
export function getReminders() {
  return dispatch =>
    axios.get('/api/v1/users/reminders').then((res) => {
      const { data } = res.data;
      dispatch({
        type: SET_REMINDERS,
        reminders: data
      });
    });
}

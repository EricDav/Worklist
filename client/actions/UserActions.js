import axios from 'axios';

import { setIsApiCallInProgress, setError,
  showHomePageForm } from './AuthActions';
import { RESET_PASSWORD_USER } from './ActionTypes';

/**
 * @description set the user requesting for reset password
 *
 * @param  {object} resetPasswordUser
 * @return {object} returns object
 */
export function setForgetPasswordUser(resetPasswordUser) {
  return {
    type: RESET_PASSWORD_USER,
    resetPasswordUser
  };
}

/**
 * @description Request to the API to send verification code
 *
 * @param  {object} payload
 * @return {object} returns object
 */
export function sendSecretCode(payload) {
  return (dispatch) => {
    dispatch(setIsApiCallInProgress(true));
    axios.post('/api/v1/users/send-secret-code', payload).then((res) => {
      dispatch(setForgetPasswordUser(res.data.data));
      dispatch(setIsApiCallInProgress(false));
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
      dispatch(setIsApiCallInProgress(false));
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
    dispatch(setIsApiCallInProgress(true));
    axios.put('/api/v1/users/reset-password', payload).then((res) => {
      Materialize.toast('Password reset successfully', 2000, 'green',
        () => {
          dispatch(showHomePageForm(1));
          dispatch(setForgetPasswordUser({}));
        }
      );
      dispatch(setIsApiCallInProgress(true));
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


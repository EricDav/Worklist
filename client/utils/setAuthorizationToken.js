import axios from 'axios';

/**
 *@description set authorization token
 *
 * @param  {String} token user token
 *
 * @return {void}
 */
export default function setAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
}

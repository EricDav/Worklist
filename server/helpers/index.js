import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.load();
/**
 * @description removes password from user information
 *
 * @param  {array} users array of users oject
 *
 * @return {object} return array of users object without their password
 */

export const removePassword = (users) => {
  if (!users.length) {
    users.password = '';
    return users;
  }
  users.forEach((user) => {
    user.password = '';
  });
  return users;
};

/**
   * @description gnerate jwt token
   *
   * @param  {object} currentUser userdetails to be encrypted
   * @param  {string} secret a secret key to be used to encrypt user details
   *
   * @return {string} token generated from user details
*/

export const generateToken = (currentUser, secret) => {
  const token = jwt.sign({
    currentUser,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, secret);
  return token;
};

/**
 * @description checks if the string pass in is a digit.
 * Means all the charcters are digit
 *
 * @param  {string} str the string to be checked
 *
 * @return {boolean} true or false
 */

export const isDigit = (str) => {
  const num = str.toString();
  if (num.length === 0) {
    return false;
  }
  for (let i = 0; i < num.length; i += 1) {
    if (/[0-9]/.test(num[i]) === false) {
      return false;
    }
  }
  return true;
};

export const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {type} fieldData the value to be checked if it is invalid
 *
 * @return {boolean} true or false
 */

export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

export const apiResponse = (res, statusCode, message, success, data = null) => {
  if (message === 'error') {
    return res.status(statusCode).json({
      success,
      error: data
    });
  }
  if (message === 'token') {
    return res.status(statusCode).json({
      success,
      token: data
    });
  }
  if (data) {
    return res.status(statusCode).json({
      success,
      data
    });
  }
  return res.status(statusCode).json({
    success,
    error: {
      message
    }
  });
};

export const isValidEmail = (email) => {
  if (isInValidField(email) || email.length < 7) {
    return false;
  } else if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
    return false;
  }
  return true;
};

export const isValidName = (name) => {
  if (isInValidField(name)) {
    return false;
  } else if (!isText(name) || name.length < 5) {
    return false;
  }
};


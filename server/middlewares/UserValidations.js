import { isInValidField, isDigit, isValidName,
  isText, apiResponse, isValidEmail, isValidPassword } from '../helpers';

import User from '../models/User';
/**
 * class UserValidation: controls all user validations
 * @class
 */
export default class UserValidations {
/**
   * @description: validate inputs field for username, name, email and password
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {function} next a call back function
   *
   * @return {object} response object
   */
  static createUserValidation(req, res, next) {
    let {
      email, userName, fullName, password
    } = req.body;
    if (email === null || email === undefined) {
      email = ''
    }
    if (userName === null || userName === undefined) {
      userName = ''
    }
    if (password === null || password=== undefined) {
     password = ''
    }
    if (isInValidField(userName) && isInValidField(userName.trim())) {
      return apiResponse(res, 400, 'username field is required', false);
    }
    if (isInValidField(email) || isInValidField(email.trim())) {
      return apiResponse(res, 400, 'email field is required', false);
    }
    if (isInValidField(fullName) && isInValidField(fullName.trim())) {
      return apiResponse(res, 400, 'fullname field is required', false);
    }
    if (
      (email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
      return apiResponse(res, 400, 'Invalid email address', false);
    }
    if ((!isText(fullName.trim())
     || fullName.trim().length < 2)) {
      return apiResponse(res, 400, `Name should contain alphabet and space
      alone and should contain at least 5 characters`, false);
    }
    if (isDigit(userName.trim()) ||
    isDigit(userName.trim()[0])) {
      return apiResponse(res, 400, `username must contain an alphabet
              and must not begin with a number`, false);
    }
    if (password.length < 9 ||
    !(/[0-9]/.test(req.body.password) &&
    /[a-z A-Z]/.test(password))) {
      return apiResponse(
        res, 400, `Weak password. Password should contain
        at least 8 characters including at least one number and alphabet`,
        false
      );
    }
    next();
  }
  /**
   * @description: validate updated field for name and email
   *
   * @param  {Object} req request object
   * @param  {Object} res response object
   * @param  {Function} next a call back function
   *
   * @return {object} response object
   */
  static updateUserValidation(req, res, next) {
    const updatedField = {};
    const error = {};
    if (req.body.fullName) {
      if (isValidName(req.body.fullName)) {
        updatedField.fullName = req.body.fullName;
      } else {
        return apiResponse(res, 400, 'Invalid fullName', false);
      }
    }
    if (req.body.email) {
      if (isValidEmail(req.body.email)) {
        User.findOne({ email: req.body.email }, (err, updatedUser) => {
          if (err) {
            return apiResponse(res, 500, 'Internal server error', false);
          }
          if (updatedUser) {
            return apiResponse(res, 409, 'email already exist', false);
          }
          updatedField.email = req.body.email;
          req.updatedField = updatedField;
          next();
        });
      } else {
        return apiResponse(res, 400, 'Invalid email', false);
      }
    } else if (updatedField.fullName) {
      req.updatedField = updatedField;
      next();
    } else {
      return apiResponse(
        res, 400,
        'either fullName or email is required', false
      );
    }
  }
}

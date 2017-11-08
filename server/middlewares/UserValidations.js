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
    const error = {};
    const canVerify = {
      userName: true,
      email: true,
      phoneNumber: true,
      fullName: true,
      password: true
    };
    if (isInValidField(req.body.userName)) {
      error.userName = 'This field is required';
      canVerify.userName = false;
    }
    if (isInValidField(req.body.email)) {
      error.email = 'This field is required';
      canVerify.email = false;
    }
    if (isInValidField(req.body.fullName)) {
      error.fullName = 'This field is required';
      canVerify.fullName = false;
    }
    if (isInValidField(req.body.password)) {
      error.password = 'This field is required';
      canVerify.password = false;
    }
    if (Object.keys(error).length === 5) {
      return res.status(400).json({
        error,
        success: false
      });
    }
    if (canVerify.email &&
     (req.body.email.slice(req.body.email.length - 4, req.body.email.length)
     !== '.com' || !(/[@]/.test(req.body.email)))) {
      canVerify.email = false;
      error.email = 'Invalid email address';
      if (Object.keys(error).length === 5) {
        return apiResponse(res, 400, 'error', false, error);
      }
    }
    if (canVerify.fullName && (!isText(req.body.fullName)
     || req.body.fullName.length < 2)) {
      if (isInValidField(error.fullName)) {
        error.fullName = `Name should contain alphabet and space
      alone and should contain at least 5 characters`;
      }
      if (Object.keys(error).length === 5) {
        return apiResponse(res, 400, 'error', false, error);
      }
    }
    if (canVerify.userName && (isDigit(req.body.userName) ||
    isDigit(req.body.userName[0]))) {
      canVerify.userName = false;
      error.userName = `username must contain an alphabet
              and must not begin with a number`;
      if (Object.keys(error).length === 5) {
        return apiResponse(res, 400, 'error', false, error);
      }
    }
    if (canVerify.password && (req.body.password.length < 9 ||
    !(/[0-9]/.test(req.body.password) &&
    /[a-z A-Z]/.test(req.body.password)))) {
      canVerify.password = false;

      if (isInValidField(error.password)) {
        error.password = `Weak password. Password should contain
        at least 8 characters including at least one number and alphabet`;
      }
      if (Object.keys(error).length === 5) {
        return apiResponse(res, 400, 'error', false, error);
      }
    }
    if (Object.keys(error).length > 0) {
      return apiResponse(res, 400, 'error', false, error);
    }
    next();
  }
  /**
   * @description: validate updated field for name and email
   *
   * @param  {object} req request object
   * @param  {object} res response object
   * @param  {function} next a call back function
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
      return apiResponse(res, 400,
        'either fullName or email is required', false);
    }
  }
}

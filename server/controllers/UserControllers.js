import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import user from '../models/user';
import { generateToken, removePassword, isInValidField, apiResponse }
  from '../helpers';

dotenv.load();
const secret = process.env.secretKey;

/**
 * class User: controls all user routes
 * @class
 */
export default class UserControllers {
/**
 * @description: creates a user through route POST: api/v1/user
 *
 * @param {Object} req requset object
 * @param {Object} res response object
 *
 * @return {Object} response containing the created user
 */
  static createUser(req, res) {
    user.findOne({
      $or: [{ email: req.body.email },
        { userName: req.body.userName }]
    }, (err, currentUser) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      if (currentUser) {
        if (currentUser.userName === req.body.userName &&
        currentUser.email === req.body.email) {
          return apiResponse(
            res, 409, 'username and email has been taken',
            false
          );
        } else if (currentUser.email === req.body.email) {
          return apiResponse(res, 409, 'email has been taken', false);
        }
        return apiResponse(res, 409, 'username has been taken', false);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);
      const newUser = user({
        fullName: req.body.fullName,
        userName: req.body.userName.toLowerCase(),
        email: req.body.email,
        password: hashedPassword
      });
      newUser.save((err, savedUser) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        const token = generateToken(removePassword(savedUser), secret);
        return apiResponse(res, 201, 'token', true, token);
      });
    });
  }
  /**
 *@description controls users login through the route
 * POST: /api/v1/signin
 *
 * @param  {object} req request object
 * @param  {object} res response object
 *
 * @return {object} response containing the user token
 */
  static authenticateUser(req, res) {
    let loginDetail;
    if (req.body.userName) {
      loginDetail = 'username';
    } else if (req.body.email) {
      loginDetail = 'email';
    } else {
      loginDetail = 'email or username';
    }
    if (isInValidField(req.body.email) && isInValidField(req.body.userName)) {
      return apiResponse(
        res, 400,
        'username or email can not be null or empty', false
      );
    }
    if (isInValidField(req.body.password)) {
      return apiResponse(
        res, 400,
        'password can not be null or empty', false
      );
    }
    user.findOne({
      $or: [{ userName: req.body.userName.toLowerCase() },
        { email: req.body.email }]
    }, (err, userInfo) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      if (!userInfo) {
        return apiResponse(
          res, 401, `Invalid ${loginDetail} or password`,
          false
        );
      }
      bcrypt.compare(req.body.password, userInfo.password, (err, response) => {
        if (response) {
          const token = generateToken(removePassword(userInfo), secret);
          return apiResponse(res, 200, 'token', true, token);
        }
        return apiResponse(
          res, 401,
          'Invalid username or password', false
        );
      });
    });
  }

  /**
   *@description update user details through the
   * route PUT: /api/v1/user
   *
   * @param  {object} req request object
   * @param  {object} res response object
   *
   * @return {object} response containing the updated user
   */
  static updateUserProfile(req, res) {
    user.findByIdAndUpdate(
      req.body.userId,
      { $set: req.body }, (err, updatedUser) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        return apiResponse(res, 200, null, true, removePassword(updatedUser));
      }
    );
  }

  /**
   *@description controls a user google signup through the route
   * POST: /api/v1/user/googleSignin
   *
   * @param  {object} req  request object
   * @param  {object} res  response object
   *
   * @return {object} response containing the user token or action status
   */
  static googleSignin(req, res) {
    if ((req.body.email.slice(req.body.email.length - 4, req.body.email.length)
     !== '.com' || !(/[@]/.test(req.body.email)))) {
      return apiResponse(res, 400, 'Invalid email', false);
    }
    user.findOne({ email: req.body.email }, (err, googleUser) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      if (googleUser === null) {
        return apiResponse(res, 200, null, true, 'New user');
      }
      const token = generateToken(removePassword(googleUser), secret);
      return apiResponse(res, 200, 'token', true, token);
    });
  }
}

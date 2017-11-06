import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import del from 'del';
import cloudinary from 'cloudinary';

import user from '../models/User';
import { generateToken, removePassword, isInValidField, apiResponse,
  isValidEmail, isValidPassword, generateCode,
  mailSender, isValidName } from '../helpers';

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
        { userName: req.body.userName.toLowerCase }]
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
    user.findOne(
      { _id: req.currentUser.currentUser._id },
      (err, updatedUser) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        return apiResponse(
          res, 200, 'token', true,
          generateToken(removePassword(updatedUser), secret)
        );
      }
    );
  }

  /**
   *@description controls a user google signup through the route
   * POST: /api/v1/user/google-signin
   *
   * @param  {object} req  request object
   * @param  {object} res  response object
   *
   * @return {object} response containing the user token or action status
   */
  static googleSignin(req, res) {
    if (isValidEmail(!req.body.email)) {
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
  /**
   * @description send secret code to users that has forgoten their password
   * through POST: /api/v1/users/sendSecretCode
   *
   *
   * @param  {object} req request object
   * @param  {object} res response object
   *
   * @return {object} an object containing the status of the response
   */
  static sendsecretCode(req, res) {
    if (!isValidEmail(req.body.email)) {
      return apiResponse(res, 400, 'Invalid email', false);
    }
    user.findOne({ email: req.body.email }, (err, requester) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      } else if (!requester) {
        return apiResponse(res, 404, 'User not found', false);
      }
      const generatedCode = generateCode();
      const { email } = req.body;
      const message = `Your Secrete code is: ${generatedCode}`;
      bcrypt.hash(generatedCode, 10, (err, hashSecret) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        mailSender(
          req, res, message, 'A code has been sent to your mail',
          hashSecret, email
        );
      });
    });
  }
  /**
   * @description Verify secrete code sent to users and reset their password
   *
   * @param  {object} req request object
   * @param  {object} res response object
   *
   * @return {object} response containing status of the action
   */
  static verifyCodeAndUpdatePassword(req, res) {
    if (isInValidField(req.body.password)) {
      return apiResponse(res, 400, 'Invalid password', false);
    } else if (!isValidPassword(req.body.password)) {
      return apiResponse(res, 400, `password should be up to
      8 characters including alphabet and number`, false);
    }
    bcrypt.compare(req.body.secretCode, req.body.hash, (err, response) => {
      if (response) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          user.findOne(
            { email: req.body.email },
            (err, forgetPasswordUser) => {
              if (err) {
                return apiResponse(res, 500, 'Internal server error', false);
              } else if (!forgetPasswordUser) {
                return apiResponse(res, 404, 'User does not exist', false);
              }
              forgetPasswordUser.password = hash;
              forgetPasswordUser.save((err, updatedUser) => {
                if (err) {
                  return apiResponse(res, 500, 'Internal server error', false);
                }
                return apiResponse(
                  res, 200, 'Your password has been reset successfully',
                  true
                );
              });
            }
          );
        });
      } else {
        return apiResponse(res, 400, 'Invalid code', false);
      }
    });
  }
  /**
 * @description: update profile picture through the route
 * PATCH: api/v1/users/:userId
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the updated todo
 */
  static uploadProfilePicture(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    if (!req.files) {
      return apiResponse(res, 400, 'No image found', false);
    }
    const uploadDir = 'server/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const { file } = req.files;
    file.mv(`${uploadDir}/${file.name}`).then(() => {
      cloudinary.v2.uploader.upload(`${uploadDir}/${file.name}`)
        .then((cloudinaryImage) => {
          const { url } = cloudinaryImage;
          user.findOne(
            { _id: req.currentUser.currentUser._id },
            (err, currentUser) => {
              if (err) {
                return apiResponse(res, 500, 'Internal server error', false);
              }
              currentUser.imageUrl = url;
              currentUser.save((err, updatedUser) => {
                if (err) {
                  return apiResponse(res, 500, 'Internal server error', false);
                }
                return apiResponse(
                  res, 200, 'token', true,
                  generateToken(removePassword(updatedUser), secret)
                );
              });
            }
          );
        });
    }).catch(() => {
      apiResponse(
        res, 500,
        'An error occured while uploading image', false
      );
    });
  }

  /**
 * @description: get usesr that matches a search string through route
 * GET: /api/v1/users
 *
 * @param {Object} req request object
 * @param {Object} res response object
 *
 * @return {Object} response containing the updated todo
 */
  static getUsers(req, res) {
    if (!isValidName(req.query.searchParam)) {
      return apiResponse(res, 400, 'Invalid query parameter', false);
    }
    user.find({
      userName: {
        $regex: `.*${req.query.searchParam}.*`
      }
    }, (err, users) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      return apiResponse(res, 200, null, true, users);
    });
  }
}

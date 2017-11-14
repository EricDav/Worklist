import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import cloudinary from 'cloudinary';

import User from '../models/User';
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
    const {
      email, fullName, userName, password
    } = req.body;
    User.findOne({
      $or: [{ email },
        { userName: userName.toLowerCase() }]
    }, (err, currentUser) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      }
      if (currentUser) {
        if (currentUser.userName === userName &&
        currentUser.email === email) {
          return apiResponse(
            res, 409, 'username and email has been taken',
            false
          );
        } else if (currentUser.email === email) {
          return apiResponse(res, 409, 'email has been taken', false);
        }
        return apiResponse(res, 409, 'username has been taken', false);
      }
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newUser = User({
        fullName,
        userName: userName.toLowerCase(),
        email,
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
 * @param  {Object} req request object
 * @param  {Object} res response object
 *
 * @return {object} response containing the user token
 */
  static authenticateUser(req, res) {
    let loginDetail;
    const { userName, email, password } = req.body;
    if (userName) {
      loginDetail = 'username';
    } else if (req.body.email) {
      loginDetail = 'email';
    } else {
      loginDetail = 'email or username';
    }
    if (isInValidField(email) && isInValidField(userName)) {
      return apiResponse(
        res, 400,
        'username or email can not be null or empty', false
      );
    }
    if (isInValidField(password)) {
      return apiResponse(
        res, 400,
        'password can not be null or empty', false
      );
    }
    User.findOne({
      $or: [{ userName: userName.toLowerCase() },
        { email }]
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
      bcrypt.compare(password, userInfo.password, (err, response) => {
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
    User.findOne(
      { _id: req.currentUser.currentUser._id },
      (err, user) => {
        if (err) {
          return apiResponse(res, 500, 'Internal server error', false);
        }
        const { email, fullName } = req.updatedField;
        const { currentUser } = req.currentUser;
        user.email = email || currentUser.email;
        user.fullName = fullName || currentUser.fullName;
        user.save((err, updatedUser) => {
          if (err) {
            return apiResponse(res, 500, 'Internal server error', false);
          }
          const token = generateToken(removePassword(updatedUser), secret);
          return apiResponse(res, 200, 'token', true, token);
        });
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
    const { email } = req.body;
    if (!isValidEmail(email)) {
      return apiResponse(res, 400, 'Invalid email', false);
    }
    User.findOne({ email }, (err, googleUser) => {
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
    const { email } = req.body;
    if (!isValidEmail(email)) {
      return apiResponse(res, 400, 'Invalid email', false);
    }
    User.findOne({ email }, (err, requester) => {
      if (err) {
        return apiResponse(res, 500, 'Internal server error', false);
      } else if (!requester) {
        return apiResponse(res, 404, 'User not found', false);
      }
      const generatedCode = generateCode();
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
    const {
      secretCode, hash, password, email
    } = req.body;
    if (isInValidField(password)) {
      return apiResponse(res, 400, 'Invalid password', false);
    } else if (!isValidPassword(password)) {
      return apiResponse(res, 400, `password should be up to
      8 characters including alphabet and number`, false);
    }
    bcrypt.compare(secretCode, hash, (err, response) => {
      if (response) {
        bcrypt.hash(password, 10, (err, hash) => {
          User.findOne(
            { email },
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
    if (!req.files || !req.files.file) {
      return apiResponse(res, 400, 'No image found', false);
    }
    const uploadDir = 'server/uploads';
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const { file } = req.files;
    const imageType = ['image/jpeg', 'image/png'];
    if (!imageType.includes(file.mimetype)) {
      return apiResponse(
        res, 415,
        `file not supported. Supported
        image formats: jpeg, jpg, jpe, png.`, false
      );
    }
    file.mv(`${uploadDir}/${file.name}`).then(() => {
      cloudinary.v2.uploader.upload(`${uploadDir}/${file.name}`)
        .then((cloudinaryImage) => {
          const { url } = cloudinaryImage;
          const { currentUser } = req.currentUser;
          User.findOne(
            { _id: currentUser._id },
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
    User.find({
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

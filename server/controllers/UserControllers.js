import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import user from '../models/user';
import { generateToken, removePassword, isInValidField } from '../helpers';

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
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(req.body.password, salt);
    const newUser = user({
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    });
    newUser.save((err, currentUser) => {
      if (err) {
        if (err.errmsg.slice(39, 62) === 'will.users index: email') {
          return res.status(409).json({
            success: false,
            error: {
              message: 'email already exist'
            }
          });
        } else if (err.errmsg.slice(39, 65) === 'will.users index: userName') {
          return res.status(409).json({
            success: false,
            error: {
              message: 'username already exist'
            }
          });
        }
        return res.status(500).json({
          success: false,
          error: {
            message: 'Internal server error'
          },
        });
      }
      const token = generateToken(removePassword(currentUser), secret);
      res.status(201).json({
        success: true,
        token
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
      return res.status(400).json({
        success: false,
        error: {
          message: `${loginDetail} can not be null or empty`
        }
      });
    }
    if (isInValidField(req.body.password)) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'password can not be null or empty'
        }
      });
    }
    user.findOne({
      $or: [{ userName: req.body.userName },
        { email: req.body.email }]
    }, (err, userInfo) => {
      if (!userInfo) {
        return res.status(401).json({
          success: false,
          error: {
            message: `Invalid ${loginDetail} or password`
          }
        });
      }
      bcrypt.compare(req.body.password, userInfo.password, (err, response) => {
        if (response) {
          const token = generateToken(removePassword(userInfo), secret);
          return res.status(200).json({
            success: true,
            token
          });
        }
        return res.status(401).json({
          success: false,
          error: {
            message: 'Invalid username or password'
          }
        });
      });
    });
  }
}

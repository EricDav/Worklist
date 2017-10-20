import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import user from '../models/user';
import { generateToken } from '../helpers';

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
          err
        });
      }
      const token = generateToken(currentUser, secret);
      res.status(201).json({
        success: true,
        token
      });
    });
  }
}

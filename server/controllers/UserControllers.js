import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

import User from '../models/User';
import { generateToken } from '../helpers'

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
    const newUser = User({
      name: req.body.name,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword
    });
    newUser.save((err, currentUser) => {
      if (err) {
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
        token,
        currentUser
      });
    });
  }
}

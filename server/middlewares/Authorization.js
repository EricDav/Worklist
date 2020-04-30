import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

import { apiResponse } from '../helpers';

dotenv.load();
const secret = process.env.secretKey;

/**
 * class Authorization: authenticate users
 * @class
 */
export default class Authorization {
/**
 * @description auntheticate user by checking
 *  if a user has a token or a valid token
 *
 * @param  {object} req request object
 * @param  {Object} res response object
 * @param  {Function} next callback
 *
 * @return {object} success or failure message.
 * success if user has a valid token
 * failure if user do not have a token or a valid token.
 */
  static verifyToken(req, res, next) {
    let token = req.body.token || req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          return apiResponse(res, 401, 'Failed to authenticate token.', false);
        }
        req.decoded = decoded;
        next();
      });
    } else {
      return apiResponse(res, 401, 'No token provided', false);
    }
  }
}

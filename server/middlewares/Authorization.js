import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

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
          return res.status(401).json({
            success: false,
            message: 'Failed to authenticate token.'
          });
        }
        req.currentUser = decoded;
        next();
      });
    } else {
      return res.status(401).send({
        success: false,
        message: 'No token provided.'
      });
    }
  }
}

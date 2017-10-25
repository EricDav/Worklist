import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.load();
/**
 * @description removes password from user information
 *
 * @param  {array} users array of users oject
 *
 * @return {object} return array of users object without their password
 */

export const removePassword = (users) => {
  if (!users.length) {
    users.password = '';
    return users;
  }
  users.forEach((user) => {
    user.password = '';
  });
  return users;
};

/**
   * @description gnerate jwt token
   *
   * @param  {object} currentUser userdetails to be encrypted
   * @param  {string} secret a secret key to be used to encrypt user details
   *
   * @return {string} token generated from user details
*/

export const generateToken = (currentUser, secret) => {
  const token = jwt.sign({
    currentUser,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24)
  }, secret);
  return token;
};

export const isValidPassword = (password) => {
  if (password.length < 9 ||
    !(/[0-9]/.test(password) &&
    /[a-z A-Z]/.test(password))) {
    return false;
  }
  return true;
};

/**
 * @description checks if the string pass in is a digit.
 * Means all the charcters are digit
 *
 * @param  {string} str the string to be checked
 *
 * @return {boolean} true or false
 */

export const isDigit = (str) => {
  const num = str.toString();
  if (num.length === 0) {
    return false;
  }
  for (let i = 0; i < num.length; i += 1) {
    if (/[0-9]/.test(num[i]) === false) {
      return false;
    }
  }
  return true;
};

export const isText = (str) => {
  if (str.length === 0) {
    return false;
  }
  for (let i = 0; i < str.length; i += 1) {
    if (/[a-z A-Z ' ']/.test(str[i]) === false) {
      return false;
    }
  }
  return true;
};

/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {type} fieldData the value to be checked if it is invalid
 *
 * @return {boolean} true or false
 */

export const isInValidField = (fieldData) => {
  if (typeof (fieldData) !== 'string' || fieldData.length === 0) {
    return true;
  }
  let hasValue = false;
  fieldData.split().forEach((value) => {
    if (value !== ' ') {
      hasValue = true;
    }
  });
  if (!hasValue) {
    return true;
  }
  return false;
};

export const apiResponse = (res, statusCode, message, success, data = null) => {
  if (message === 'error') {
    return res.status(statusCode).json({
      success,
      error: data
    });
  }
  if (message === 'token') {
    return res.status(statusCode).json({
      success,
      token: data
    });
  }
  if (data) {
    return res.status(statusCode).json({
      success,
      data
    });
  }
  return res.status(statusCode).json({
    success,
    error: {
      message
    }
  });
};

export const isValidEmail = (email) => {
  if (isInValidField(email) || email.length < 7) {
    return false;
  } else if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
    return false;
  }
  return true;
};

export const isValidName = (name) => {
  if (isInValidField(name)) {
    return false;
  } else if (!isText(name) || name.length < 5) {
    return false;
  }
  return true;
};

/**
   * @description generate secret code to be sent to forgot password users
   * 
   * @return  {string} random secret code
*/

export const generateCode = () => {
  const number = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  const alpha = ['a', 'B', 'c', 'D', 'e', 'F', 'g', 'H', 'i',
    'J', 'k', 'L', 'm',
    'N', 'o', 'P', 'q', 'R', 's', 'T', 'u', 'V', 'w', 'X', 'y', 'Z'];
  const char = ['@', '%', '?', '+', '-', '$', '#'];
  let secretCode = '';
  [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].forEach((num) => {
    if (num < 3 || num > 8) {
      secretCode = `${secretCode}${number[Math.floor(Math.random() * 10)]}`;
    } else if (num > 2 && num < 7) {
      secretCode = `${secretCode}${alpha[Math.floor(Math.random() * 26)]}`;
    } else {
      secretCode = `${secretCode}${char[Math.floor(Math.random() * 7)]}`;
    }
  });
  return secretCode;
};

/**
 * @description send a mail that contains the secret to reset a user password
 *
 * @param  {object} req request object
 * @param {object} res response object
 * @param {string} mesage the message that contains the secret code to
 * be sent to users mail
 * @param {string} successMessage success message
 * @param {string} secretCode the secret code to be sent as part of the
 * response
 * @param {string} email the email of the user to recieve the message
 *
 * @return {boolean} true or false
 */

export const mailSender = (
  req, res, message,
  successMessage, secretCode, email
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: `PostIt <${process.env.EMAIL}`,
    to: req.body.email,
    subject: 'PostIt',
    text: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return apiResponse(res, 500,
        'An error occured while sending mail', false);
    }
    return apiResponse(res, 200, null, true, {
      success: true,
      message: successMessage,
      SwZ5: secretCode,
      email
    });
  });
};

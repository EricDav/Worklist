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

/**
 * @description checks if the string pass in is a text.
 * Means all the charcters are alphabets
 *
 * @param  {string} str the string to be checked
 *
 * @return {boolean} true or false
 */
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

/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {Object} res response object
 * @param  {Number} statusCode status code
 * @param  {String} message response message
 * @param  {Boolean}  success response data
 * @param  {Boolean}  data response data
 *
*@return {Object} response object
 */
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
  if (message === 'users') {
    return res.status(statusCode).json({
      success,
      users: data
    });
  }
  if (message === 'todolists') {
    return res.status(statusCode).json({
      success,
      todolists: data
    });
  }
  if (message === 'todolist') {
    return res.status(statusCode).json({
      success,
      todolist: data
    });
  }
  if (message === 'reminders') {
    return res.status(statusCode).json({
      success,
      reminders: data
    });
  }
  if (message === 'message') {
    return res.status(statusCode).json({
      success,
      message: data
    });
  }
  return res.status(statusCode).json({
    success,
    error: {
      message
    }
  });
};

/**
 *@description checks if a value passed in is a valid email
 *
 * @param  {Object} email the value to be checked if it is a valid email
 *
 * @return {Boolean} true or false
 */
export const isValidEmail = (email) => {
  if (isInValidField(email) || email.length < 7) {
    return false;
  } else if ((email.slice(email.length - 4, email.length)
     !== '.com' || !(/[@]/.test(email)))) {
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
    from: `Worklist <${process.env.EMAIL}`,
    to: req.body.email,
    subject: 'Worklist',
    text: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return apiResponse(
        res, 500,
        'An error occured while sending mail', false
      );
    }
    return apiResponse(res, 200, 'message', true, {
      success: true,
      message: successMessage,
      SwZ5: secretCode,
      email
    });
  });
};

/**
 *@description checks if a field is a valid name
 *
 * @param  {type} name the value to be checked if it is valid
 *
 * @return {boolean} true or false
 */
export const isValidName = (name) => {
  const value = name.trim();
  if (name.length === 0) {
    return false;
  }
  for (let i = 0; i < value.length; i += 1) {
    if (!(/[0-9]/.test(value[i]) || /[a-z A-Z]/.test(value[i]))) {
      return false;
    }
  }
  if (isDigit(value)) {
    return false;
  }
  return true;
};

/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {String} message the message to send to user email address
 * @param  {String} email user email address
 *
 * @return {Boolean} true or false
 */
export const sendReminders = (message, email) => {
  const transporter = nodemailer.createTransport({
    service: process.env.SERVICE,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.GMAIL_PASSWORD
    }
  });
  const mailOptions = {
    from: `Worklist <${process.env.EMAIL}`,
    to: email,
    subject: 'Worklist',
    html: message
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    }
  });
};

/**
 *@description checks if a field is null, undefined or empty
 *
 * @param  {String} name name of the user recieving eminder
  * @param  {String} todoname the name of the todolist
 * @param  {String} task name of the task
 * @param  {String} dueDate the due date of the task
 *
 * @return {Array} an erray containing the message for emails and
 * for application
 */
export const createMessage = (name, todoname, task, dueDate) => {
  const appMessage = 'The task you are assign to, ';
  const message = `<h3 style="color: indigo">Hi ${name}</h3><br/>
    <div style="font-size: 15px">This is to remind you that the ${task}
    task you are assign to<br/> in
    ${todoname} todolist is yet to be completed and will be due on
    ${dueDate}<br/>
    <br/>
    <i>Thanks.</i>`;
  return [message, appMessage];
};


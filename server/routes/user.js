import express from 'express';

import UserControllers from '../controllers/UserControllers';
import UserValidations from '../middlewares/UserValidations';
import Authorization from '../middlewares/Authorization';
import ReminderControllers from '../controllers/ReminderControllers';

const user = express.Router();
user.post(
  '/api/v1/users', UserValidations.createUserValidation,
  UserControllers.createUser
);

user.post('/api/v1/users/signin', UserControllers.authenticateUser);

user.put(
  '/api/v1/users', Authorization.verifyToken,
  UserValidations.updateUserValidation, UserControllers.updateUserProfile
);

user.post('/api/v1/users/google-signin', UserControllers.googleSignin);

user.post('/api/v1/users/send-secret-code', UserControllers.sendsecretCode);

user.patch(
  '/api/v1/users/reset-password',
  UserControllers.verifyCodeAndUpdatePassword
);
user.get('/api/v1/users', Authorization.verifyToken, UserControllers.getUsers);
user.patch(
  '/api/v1/users', Authorization.verifyToken,
  UserControllers.uploadProfilePicture
);

user.get(
  '/api/v1/users/reminders', Authorization.verifyToken,
  ReminderControllers.getReminders
);

export default user;

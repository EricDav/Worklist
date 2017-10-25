import express from 'express';

import UserControllers from '../controllers/UserControllers';
import UserValidations from '../middlewares/UserValidations';
import Authorization from '../middlewares/Authorization';

const user = express.Router();
user.post(
  '/api/v1/users', UserValidations.createUserValidation,
  UserControllers.createUser
);

user.post('/api/v1/users/signin', UserControllers.authenticateUser);

user.patch('/api/v1/users', Authorization.verifyToken,
  UserControllers.updateUserProfile);

user.post('/api/v1/users/google-signin', UserControllers.googleSignin);

user.post('/api/v1/users/send-secret-code', UserControllers.sendsecretCode);

user.put(
  '/api/v1/users/reset-password',
  UserControllers.verifyCodeAndUpdatePassword
);

export default user;

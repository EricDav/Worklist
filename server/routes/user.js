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

user.post('/api/v1/users/google-signin', UserControllers.googleSignin);

user.patch('/api/v1/users', Authorization.verifyToken,
  UserValidations.updateUserValidation, UserControllers.updateUserProfile);

user.get('/api/v1/users', Authorization.verifyToken,
  UserControllers.searchUsers);

export default user;

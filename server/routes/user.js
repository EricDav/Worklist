import express from 'express';

import UserControllers from '../controllers/UserControllers';
import UserValidations from '../middlewares/UserValidations';

const user = express.Router();
user.post(
  '/api/v1/users', UserValidations.createUserValidation,
  UserControllers.createUser
);

user.post('/api/v1/users/signin', UserControllers.authenticateUser);

user.post('/api/v1/users/google-signin', UserControllers.googleSignin);

export default user;

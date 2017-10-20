import express from 'express';

import UserControllers from '../controllers/UserControllers';
import UserValidations from '../middlewares/UserValidations';

const users = express.Router();

users.post(
  '/api/v1/users', UserValidations.createUserValidation,
  UserControllers.createUser
);

users.post('/api/v1/signin', UserControllers.authenticateUser);

export default users;

import express from 'express';

import UserControllers from '../controllers/UserControllers';
import UserValidations from '../middlewares/UserValidations';

const user = express.Router();

user.post(
  '/api/v1/users', UserValidations.createUserValidation,
  UserControllers.createUser
);

user.post('/api/v1/signin', UserControllers.authenticateUser);

export default user;

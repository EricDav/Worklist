import express from 'express';

import UserControllers from '../controllers/UserControllers';
import UserValidations from '../middlewares/UserValidations';

const users = express.Router();

users.post(
  '/api/v1/users', UserValidations.createUserValidation,
  UserControllers.createUser
);

export default users;

import express from 'express';

import UserControllers from '../controllers/UserControllers';

const users = express.Router();

userRoutes.post('/api/v1/users', UserControllers.createUser);

export default users;

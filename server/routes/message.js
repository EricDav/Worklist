import express from 'express';

import UserControllers from '../controllers/UserControllers';

const message = express.Router();
message.post(
  '/api/v1/mesage',
  UserControllers.createMessage
);

message.get('/api/v1/message', UserControllers.getMessages);

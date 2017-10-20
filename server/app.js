import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import moongose from 'mongoose';
import dotenv from 'dotenv';

import user from './routes/user';

dotenv.load();

const port = process.env.PORT || 8000;
const app = express();
const url = process.env.MONGOHQ_URL;
moongose.connect(url);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(user);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

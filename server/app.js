import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import moongose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import fileUpload from 'express-fileupload';

import webpackConfig from '../webpack.config.dev';
import webpackConfigProduction from '../webpack.config.prod';

import user from './routes/user';
import todo from './routes/todo';
import reminder from './controllers/ReminderControllers';
import config from './config/config';

dotenv.load();

const port = process.env.PORT || 8000;
const app = express();
const url = config.db[process.env.NODE_ENV];


if (process.env.NODE_ENV === 'development') {
  app.use(webpackMiddleware(webpack(webpackConfig)));
} else {
  app.use(webpackMiddleware(webpack(webpackConfigProduction)));
}

moongose.connect(url);

app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(fileUpload());
app.use(user);
app.use(todo);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

reminder.start();

export default app;

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import moongose from 'mongoose';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config.dev';
import user from './routes/user';
import todo from './routes/todo';

dotenv.load();

const port = process.env.PORT || 8000;
const app = express();
const url = process.env.MONGOHQ_TEST_URL;
moongose.connect(url);

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use(express.static(path.join(__dirname, '../client')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(user);
app.use(todo);

app.listen(port, () => {
  console.log(`server started on ${port}`);
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/index.html'));
});
export default app;

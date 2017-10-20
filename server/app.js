import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';

const port = process.env.PORT || 9000;
const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
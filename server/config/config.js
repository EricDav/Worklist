import dotenv from 'dotenv';

dotenv.load();

export default {
  db: {
    production: process.env.PROD_DATABASE_URL,
    development: process.env.DEVELOPMENT_DATABASE_URL,
    test: process.env.TEST_DATABASE_URL,
  }
};

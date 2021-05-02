/**
 * @description   : It is use to establish the connection with database using mongoose ODM
 *                  to MongoDB
 * @package       : mongoose, dotenv
 * @file          : dbConfig.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/

require('dotenv').config();

const mongoose = require('mongoose');
const logger = require('../app/logger/user');

mongoose.Promise = global.Promise;
// Connecting to the database
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
}).then(() => {
  logger.log('info', 'Successfully connected to the database');
}).catch((err) => {
  logger.log('error', 'Could not connect to the database. Exiting now...', err);
  process.exit();
});

/* eslint-disable linebreak-style */
/**
 * @description   : It is use create log files for successfull operation as well as for
 *                  failed operation.
 * @package       : winston
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const {
  createLogger,
  transports,
  format,
} = require('winston');

const logger = createLogger({
  transports: [
    new transports.File({
      filename: './logger/info.log',
      level: 'info',
      format: format.combine(format.timestamp(), format.json()),
    }),
    new transports.File({
      filename: './logger/error.log',
      level: 'error',
      format: format.combine(format.timestamp(), format.json()),
    }),
  ],
});

module.exports = logger;

/* eslint-disable linebreak-style */
/**
 * @description   : It is work as a middleware between models and controller
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const bcrypt = require('bcrypt');
const models = require('../models/user');
const { sendingEmail } = require('../utility/helper');

class Service {
  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : create from models
  */
  create = (data, callback) => {
    models.create(data, callback);
  }

  /**
   * @description     : it acts as a midlleware for models and controllers
   * @param           : data, callback
   * @method          : login from models
  */
  login = (data, callback) => {
    const { password } = data;
    models.login(data, (error, result) => {
      if (result) {
        bcrypt.compare(password, result.password, (err, resultt) => {
          if (err) {
            callback(err, null);
          }
          if (resultt) {
            const resultOne = {
              message: 'success',
            };
            callback(null, resultOne);
          } else {
            callback('Password does not match');
          }
        });
      } else {
        callback('user not found');
      }
    });
  }

  forgotPassword = (data, callback) => {
    const username = data;
    models.forgotPassword(username, (error) => {
      const sendEmail = error ? callback(error, null) : callback(null, sendingEmail(username));
      return sendEmail;
    });
  }
}

module.exports = new Service();

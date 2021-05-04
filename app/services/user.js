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

  /**
   * @description         : it acts as a midlleware for models and controllers
   * @param    {data}     : taking data from controller
   * @param   {callback}  : giving result to controller
   * @method              : forgotPassword from models
  */
  forgotPassword = (data, callback) => {
    const username = data;
    models.forgotPassword(username, (error, result) => {
      if (result) {
        error ? callback(error, null) : callback(null, sendingEmail(username));
      } else {
        callback('Email does not exist');
      }
    });
  }

  /**
   * @description         : it acts as a midlleware for models and controllers
   * @param    {data}     : taking data from controller
   * @param   {callback}  : giving result to controller
   * @method              : resetPassword from models
  */
  resetPassword = (data, callback) => {
    const userCredential = {
      email: data.email,
      password: data.password,
    };
    models.resetPassword(userCredential, (error, result) => {
      if (result) {
        bcrypt.hash(result.password, 10, (err, resultt) => {
          err ? callback(err) : callback(null, resultt);
        });
      } else {
        callback('Unable to change password or token expired');
      }
    });
  }
}

module.exports = new Service();

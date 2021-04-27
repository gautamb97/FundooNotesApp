/* eslint-disable linebreak-style */
/**
 * @description   : It is work as a middleware between models and controller
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const models = require('../models/user');

class Service {
  create = (data, callback) => {
    models.create(data, callback);
  }

  login = (data, callback) => {
    models.login(data, callback);
  }

  // login = (req, res) => {
  //   fundooNotes.login(req, res);
  // }
}

module.exports = new Service();

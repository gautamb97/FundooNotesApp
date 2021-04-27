/* eslint-disable linebreak-style */
/**
 * @description   : It is work as a middleware between models and controller
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const fundooNotes = require('../models/user');

class Service {
  create = (data, callback) => {
    fundooNotes.create(data, (err, result) => {
      const service = err ? callback(err) : callback(null, result);
      return service;
    });
  }

  login = (data, callback) => {
    fundooNotes.login(data, (err, result) => {
      const service = err ? callback(err) : callback(null, result);
      return service;
    });
  }

  // login = (req, res) => {
  //   fundooNotes.login(req, res);
  // }
}

module.exports = new Service();

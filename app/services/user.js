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
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }

  findAll = (callback) => {
    fundooNotes.findAll((err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    });
  }
}

module.exports = new Service();

/* eslint-disable linebreak-style */
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

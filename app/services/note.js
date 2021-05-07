const models = require('../models/note');

class Service {
  createNote = (data, callback) => {
    models.create(data, callback);
  }
}

module.exports = new Service();

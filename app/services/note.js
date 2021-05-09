const models = require('../models/note');
const { getIdByToken } = require('../utility/helper');

class Service {
  createNote = (data, token, callback) => {
    const noteDetails = getIdByToken(data, token);
    models.create(noteDetails, callback);
  }
}

module.exports = new Service();

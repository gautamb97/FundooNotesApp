/**
 * @description   : It is work as a middleware between models and controller
 * @file          : note.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const models = require('../models/note');
const { setRedis } = require('../utility/redisCache');

class Service {
  /**
   * @description   : It is used to create note taking data from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @param {token} : its has login token and sending to helper to extract id of user
  */
  createNote = (data, callback) => {
    models.create(data, callback);
  }

  /**
   * @description   : It is used to update an existing note taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
  */
  updateNote = (data, callback) => {
    models.updateNote(data, callback);
  }

  /**
   * @description   : It is used to find all existing notes taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : notes which we are fetching
  */
  getAllNotes = (data, callback) => {
    const KEY = 'notes';
    models.getAllNotes(data, (error, result) => {
      console.log('comming to service');
      if (error) {
        callback(error, null);
      } else {
        setRedis(KEY, result);
        callback(null, result);
      }
    });
  }

  /**
   * @description   : It is used to delete an existing note taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
  */
  deleteNote = (data, callback) => {
    models.deleteNote(data, callback);
  }

  /**
   * @description   : It is used to add label to an existing note taking data from controller
   *                  and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : Callback
  */
  addLabelToNote = (data, callback) => {
    models.addLabelToNote(data, callback);
  }

  /**
   * @description   : It is used to delete an existing label from existing note taking data
   *                  from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @returns       : Promise
  */
  removeLabelFromNote = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.removeLabelFromNote(data);
      result.then((labelData) => resolve({ labelData }))
        .catch((err) => reject({ err }));
    });
  }
}

module.exports = new Service();

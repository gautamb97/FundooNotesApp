/**
 * @description   : It is work as a middleware between models and controller
 * @file          : label.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const models = require('../models/label');

class Service {
  /**
   * @description   : It is used to create label taking data from controller and sending to models
   * @param {data}  : it contains data which we are passing from body
   * @param {token} : its has login token and sending to helper to extract id of user
  */
  createLabel = async (data) => {
    if (data) {
      const labelData = await models.createLabel(data);
      return labelData;
    }
  }

  /**
 * @description   : It is used to update label taking data from controller and sending to models
 * @param {data}  : it contains data which we are passing from body
 * @param {token} : its has login token and sending to helper to extract id of user
 * @returns       : Promise
*/
  updateLabel = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.updateLabel(data);
      result.then((labelData) => {
        resolve({ labelData });
      }).catch((err) => {
        reject({ err });
      });
    });
  }

  /**
 * @description   : It is used to delete an existing label taking data from
 *                  controller and sending to models
 * @param {data}  : it contains data which we are passing from body
 * @param {token} : its has login token and sending to helper to extract id of user
 * @returns       : Promise
*/
  deleteLabel = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.deleteLabel(data);
      result.then((labelData) => {
        resolve({ labelData });
      }).catch((err) => {
        reject({ err });
      });
    });
  }

  /**
 * @description   : It is used to get all labels from fundooNotes
 *                  taking data from controller and sending to models
 * @param {data}  : it contains data which we are passing from body
 * @param {token} : its has login token and sending to helper to extract id of user
 * @returns       : Promise
*/
  getAllLabels = (data) => {
    return new Promise((resolve, reject) => {
      const result = models.getAllLabels(data);
      result.then((labelData) => resolve({ labelData }))
        .catch((err) => reject({ err }));
    });
  }
}
module.exports = new Service();

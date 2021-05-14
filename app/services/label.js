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
  createLabel = (data) => new Promise((resolve, reject) => {
    if (data) {
      return resolve(models.createLabel(data));
    }
    return reject(error, 'label not created');
  });

  /**
 * @description   : It is used to update label taking data from controller and sending to models
 * @param {data}  : it contains data which we are passing from body
 * @param {token} : its has login token and sending to helper to extract id of user
*/
  updateLabel = (data) => new Promise((resolve, reject) => {
    const result = models.updateLabel(data);
    result.then((labelData) => {
      resolve({ labelData });
    }).catch((err) => {
      reject({ err });
    });
  });

  deleteLabel = (data) => new Promise((resolve, reject) => {
    const result = models.deleteLabel(data);
    result.then((labelData) => {
      resolve({ labelData });
    }).catch((err) => {
      reject({ err });
    });
  });

  getAllLabels = (data) => new Promise((resolve, reject) => {
    if (data) {
      return resolve(models.getAllLabels(data));
    }
    return reject(error, 'unable to fetch labels');
  });
}
module.exports = new Service();

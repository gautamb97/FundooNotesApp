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
}
module.exports = new Service();

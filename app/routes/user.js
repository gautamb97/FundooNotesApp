/* eslint-disable linebreak-style */

/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const controller = require('../controllers/user');
const noteController = require('../controllers/note');

module.exports = (app) => {
  app.post('/registration', controller.create);

  app.post('/login', controller.login);

  app.post('/forgotPassword', controller.forgotPassword);

  app.post('/resetPassword', controller.resetPassword);

  app.post('/notes', noteController.createNote);
};

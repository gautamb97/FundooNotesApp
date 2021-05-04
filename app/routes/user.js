/* eslint-disable linebreak-style */
/* eslint-disable global-require */
/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
module.exports = (app) => {
  const controller = require('../controllers/user');

  app.post('/registration', controller.create);

  app.post('/login', controller.login);

  app.post('/forgotPassword', controller.forgotPassword);

  app.post('/resetPassword', controller.resetPassword);
};

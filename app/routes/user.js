/* eslint-disable linebreak-style */
/* eslint-disable global-require */
/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
module.exports = (app) => {
  const controller = require('../controllers/user');

  /**
   * @description   : It uses create method of controller and an endpoint resgistration
   *                  to register an user using post API
   * @param         : endpoint as registration and create method from controller
  */
  app.post('/registration', controller.create);

  /**
   * @description   : It uses login method of controller and an endpoint login
   *                  to login an user using post API
   * @param         : endpoint as login and login method from controller
  */
  app.post('/login', controller.login);
};

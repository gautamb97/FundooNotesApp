/* eslint-disable linebreak-style */
/* eslint-disable global-require */
/**
 * @description   : It is use to route the APIs
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
module.exports = (app) => {
  const fundooNotes = require('../controllers/user');

  app.post('/registration', fundooNotes.create);

  app.post('/login', fundooNotes.login);
};

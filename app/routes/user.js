/* eslint-disable linebreak-style */
/* eslint-disable global-require */
module.exports = (app) => {
  const fundooNotes = require('../controllers/user');

  app.post('/fundooNotes', fundooNotes.create);
};

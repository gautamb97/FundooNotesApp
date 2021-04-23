/* eslint-disable linebreak-style */
module.exports = (app) => {
  const fundooNotes = require('../controllers/user');

  app.post('/fundooNotes', fundooNotes.create);

  app.get('./fundooNotes', fundooNotes.findAll);

  app.get('./fundooNotes/:fundooNoteId', fundooNotes.findOne);

  app.put('/fundooNotes/:fundooNoteId', fundooNotes.update);

  app.delete('/fundooNotes/:fundooNoteId', fundooNotes.delete);
};

require('dotenv').config();
const services = require('../services/note');

class NoteController {
    createNote = (req, res) => {
      try {
        const noteDetails = {
          title: req.body.title,
          description: req.body.description,
          color: req.body.color,
        };
        services.createNote(noteDetails, (error, data) => {
          if (error) {
            return res.status(400).send({
              success: false,
              message: 'Unable to create note',
            });
          }
          return res.status(200).send({
            success: true,
            message: 'note created successfully',
          });
        });
      } catch (err) {
        res.status(500).send({
          success: false,
          message: 'Internal server error',
        });
      }
    }
}

module.exports = new NoteController();

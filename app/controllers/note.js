/**
 * @description   : It is use to taking the request from the client and gives the response.
 * @file          : note.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
require('dotenv').config();
const services = require('../services/note');
const { checkIdField, updateNoteField } = require('../utility/helper');

class NoteController {
  /**
   * @description : It is creating a note in fundooNotes for particular user.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : createNote from service.js
  */
  createNote = (req, res) => {
    try {
      const noteDetails = {
        title: req.body.title,
        description: req.body.description,
        userId: req.userId,
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
          data,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is updating an existing note in fundooNotes for particular user.
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : updateNote from service.js
  */
  updateNote = (req, res) => {
    try {
      const noteData = {
        title: req.body.title,
        description: req.body.description,
        noteId: req.params.noteId,
      };
      const checkField = updateNoteField.validate(noteData);
      if (checkField.error) {
        res.status(400).send({
          success: false,
          message: 'the field can not be empty which you want to update in note',
          data: checkField,
        });
        return;
      }
      services.updateNote(noteData, (error) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Unable to update note',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'note updated successfully',
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is getting all existing notes from fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : getAllNotes from service.js
  */
  getAllNotes = (req, res) => {
    try {
      services.getAllNotes(req, (error, result) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Unable to get the notes',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'fetched notes successfully',
          result,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is deleting an existing note in fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : deleteNote from service.js
  */
  deleteNote = (req, res) => {
    try {
      services.deleteNote(req.params.noteId, (error, result) => {
        if (error) {
          return res.status(400).send({
            success: false,
            message: 'Unable to delete the note',
          });
        }
        return res.status(200).send({
          success: true,
          message: 'note deleted successfully',
          result,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is adding label to an an existing note in fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : addLabelToNote from service.js
  */
  addLabelToNote = (req, res) => {
    try {
      const data = {
        labelId: req.body.labelId,
        noteId: req.body.noteId,
        userId: req.userId,
      };
      const checkField = checkIdField.validate(data);
      if (checkField.error) {
        res.status(400).send({
          success: false,
          message: 'the field can not be empty which you want to add to note',
          data: checkField,
        });
        return;
      }
      services.addLabelToNote(data).then(() => {
        res.status(200).send({
          success: true,
          message: 'label added to note successfully',
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'label was unable to load on note',
          err,
        });
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: 'Internal server error',
      });
    }
  }

  /**
   * @description : It is deleting an label from an existing note in fundooNotes
   * @param {httprequest} req
   * @param {httpresponse} res
   * @method       : removeLabelFromNote from service.js
  */
  removeLabelFromNote = (req, res) => {
    try {
      const data = {
        labelId: req.body.labelId,
        noteId: req.body.noteId,
        userId: req.userId,
      };
      const checkField = checkIdField.validate(data);
      if (checkField.error) {
        res.status(400).send({
          success: false,
          message: 'the field can not be empty which you want to delete from note',
        });
        return;
      }
      services.removeLabelFromNote(data).then(() => {
        res.status(200).send({
          success: true,
          message: 'label removed from note successfully',
        });
      }).catch((err) => {
        res.status(400).send({
          success: false,
          message: 'label was unable to remove from note',
          err,
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

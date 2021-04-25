/* eslint-disable linebreak-style */
const fundooNotes = require('../services/user');
const { authSchema } = require('../utility/helper');

class Controller {
  create = (req, res) => {
    const fundooNote = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const validationResult = authSchema.validate(fundooNote);
    if (validationResult.error) {
      res.status(400).send({
        success: false,
        message: 'Pass the proper format of all the fields',
        data: validationResult,
      });
      return;
    }
    fundooNotes.create(fundooNote, (error, data) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: 'Some error occured',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'created successfully',
          result: data,
        });
      }
    });
  }

  findAll = (req, res) => {
    fundooNotes.findAll((error, data) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: 'Some error occured',
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'data found successfully',
          result: data,
        });
      }
    });
  }
}

module.exports = new Controller();

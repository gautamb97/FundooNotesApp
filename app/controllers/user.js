/* eslint-disable linebreak-style */
/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const services = require('../services/user');
const { authSchema } = require('../utility/helper');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
    services.create(fundooNote, (error, data) => {
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

  login = (req, res) => {
    const fundooNote = {
      email: req.body.username,
      password: req.body.password,
    };
    services.login(fundooNote, (error, data) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: 'login failed',
          error,
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'logged in successfully',
          result: jwt.sign({ name: data.name }, 'verySecretValue', { expiresIn: '1h' }),
        });
      }
    });
  }

  // login = (req, res) => {
  //   const fundooNote = {
  //     email: req.body.email,
  //     password: req.body.password,
  //   };
  //   fundooNotes.login(fundooNote, (error, data) => {
  //     if (data) {
  //         bcrypt.compare(fundooNotes.password, data.password, function(err, result){
  //           if(err) {
  //             res.json({
  //               error: err
  //             })
  //           }
  //           if (result){
  //             let token = jwt.sign({name: data.name}, 'verySecretValue', {expiresIn : '1h'})
  //             res.json({
  //               message: 'login successful',
  //               token
  //             })
  //           }else{
  //             res.json({
  //               message: 'password does not match'
  //             })
  //           }
  //         })
  //     } else {
  //       res.json({
  //         message: 'No user found'
  //       })
  //     }
      // else {
      //   res.status(200).send({
      //     success: true,
      //     message: 'login successfull!!!',
      //     result: data,
      //   });
      // }
  //   });
  // }
    // login = (req, res) => {
    //   fundooNotes.login(req, res);
    // }
}

module.exports = new Controller();

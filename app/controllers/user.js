/* eslint-disable linebreak-style */
/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const jwt = require('jsonwebtoken');
require('dotenv').config();
const nodemailer = require('nodemailer');
const services = require('../services/user');
const { authSchema } = require('../utility/helper');
const logger = require('../logger/user');

/**
 * @description    : This class has two methods to create and login of user
 * @methods        : create and login
*/

class Controller {
  /**
   * @description   : creates an note in fundooNote
   * @param         : httpRequest and httpResponse
   * @method        : validate it compares the authSchema properties and the data coming
   *                  from the object and using services file method
  */
  create = (req, res) => {
    const userDetails = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
    };
    const validationResult = authSchema.validate(userDetails);
    if (validationResult.error) {
      res.status(400).send({
        success: false,
        message: 'Pass the proper format of all the fields',
        data: validationResult,
      });
      return;
    }
    services.create(userDetails, (error, data) => {
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

  /**
   * @description   : login an user in fundooNote
   * @param         : httpRequest and httpResponse
   * @method        : services file method for login having an object and callback
  */
  login = (req, res) => {
    const loginCredentials = {
      email: req.body.username,
      password: req.body.password,
    };
    services.login(loginCredentials, (error, data) => {
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

  forgotPassword = (req, res) => {
    const userCredential = {
      email: req.body.username,
    };
    services.forgotPassword(userCredential, (error, result) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: 'login failed',
          error,
        });
      } else {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });

        const message = {
          from: process.env.EMAIL,
          to: userCredential.email,
          subject: 'Hello Endrew',
          text: 'This mail is just for testing',

        };

        transporter.sendMail(message, function (error, info) {
          if (error) {
            logger.log('error', error);
          } else {
            res.status(200).send({
              success: true,
              message: 'mailed successfully',
            });
          }
        });
      }
    });
  }
}

module.exports = new Controller();

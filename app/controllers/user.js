/* eslint-disable linebreak-style */
/**
 * @description   : It is use to taking the request from the client and gives the response and
 *                  validating whether the input is correct or not.
 * @file          : user.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
require('dotenv').config();
const jwt = require('jsonwebtoken');
const services = require('../services/user');
const { authSchema, generatingToken } = require('../utility/helper');

/**
 * @description    : This class has two methods to create and login of user
 * @methods        : create, login and forgotPassword
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
          result: generatingToken(data),
        });
      }
    });
  }

  /**
   * @description     : used when a user forgot his/her password
   * @param {httprequest} : req
   * @param {httpresponse} : res
   * @method          : forgotPasssword
   * @file            : user.js
  */
  forgotPassword = (req, res) => {
    const userCredential = {
      email: req.body.username,
    };
    services.forgotPassword(userCredential, (error, result) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: 'failed to send email',
          error,
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'Email sent successfully',
          result,
        });
      }
    });
  }

  /**
   * @description     : used when a user forgot his/her password
   * @param {httprequest} : req
   * @param {httpresponse} : res
   * @method          : resetPassword
   * @package         : jwt
   * @file            : user.js
  */
  resetPassword = (req, res) => {
    const tokenVerification = jwt.verify(req.headers.token, process.env.SECRET);
    const userCredential = {
      password: req.body.password,
      email: tokenVerification.data.email,
    };
    userCredential.Id = tokenVerification.id;
    services.resetPassword(userCredential, (error, result) => {
      if (error) {
        res.status(400).send({
          success: false,
          message: 'failed reset the password',
          error,
        });
      } else {
        res.status(200).send({
          success: true,
          message: 'password changed successfully',
          result,
        });
      }
    });
  }
}

module.exports = new Controller();

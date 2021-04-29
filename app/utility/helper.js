/* eslint-disable linebreak-style */
/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : helper.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const logger = require('../logger/user');
require('dotenv').config();

/**
 * @description   : validating all parameters we are getting from the user for registration
 * @method        : string, min, required, pattern of JOI
*/
const authSchema = Joi.object({
  firstName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z][a-z]{3,}$')),

  lastName: Joi.string()
    .min(3)
    .required()
    .pattern(new RegExp('^[A-Z][a-z]{3,}$')),

  email: Joi.string()
    .pattern(new RegExp('([a-z0-9\\.-]+)@([a-z0-9-]+).([a-z]{2,4})(.[a-z]{2})?$'))
    .required(),

  password: Joi.string()
    .required()
    .pattern(new RegExp('(?=.*[A-Z])(?=.*[0-9])(?=.*\\W)[a-zA-Z0-9\\#]{8,}')),
});

const generatingToken = (data) => {
  const token = jwt.sign({ name: data.name }, process.env.SECRET, { expiresIn: '1h' });
  return token;
};

const sendingEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: data.email,
    subject: 'Hello Endrew',
    text: 'This mail is just for testing',

  };

  transporter.sendMail(message, (err, info) => {
    const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info);
    return sendEmailInfo;
  });
};

module.exports = {
  authSchema,
  generatingToken,
  sendingEmail,
};

/**
 * @description   : It is use to validate the inputs we are getting from client side using joi and
 *                  also using Regular expression to follow the pattern properly.
 * @package       : joi
 * @file          : helper.js
 * @author        : Gautam Biswal <gautam971997@gmail.com>
*/
const Joi = require('joi');
const jwt = require('jsonwebtoken');
const ejs = require('ejs');
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

const checkIdField = Joi.object({
  labelId: Joi.string()
    .required(),

  noteId: Joi.string()
    .required(),

  userId: Joi.string()
    .required(),
});

const updateNoteField = Joi.object({
  title: Joi.string()
    .required(),

  description: Joi.string()
    .required(),

  noteId: Joi.string()
    .required(),
});

/**
 * @description   : creating token using jsonwebtoken module
 * @param {data} as data which comes from the body of postmen
 * @module        : jwt
*/
const generatingToken = (data) => {
  console.log(data);
  const token = jwt.sign({ email: data.email, id: data._id }, process.env.SECRET, { expiresIn: '24h' });
  return token;
};

/**
 * @description   : veryfying token using jsonwebtoken module
 * @param {data}  : it contains the token which we want to verify and then sending to controller
 * @module        : jwt
*/
const verifyingToken = (req, res, next) => {
  try {
    const tokenVerification = jwt.verify(req.headers.token, process.env.SECRET);
    req.userData = tokenVerification;
    const userId = tokenVerification.id;
    req.userId = userId;
    next();
  } catch (err) {
    res.status(401).send({
      err: 'Unauthorized user',
    });
  }
};

/**
 * @description   : sending an email through nodemailer
 * @module        : nodemailer, ejs
 * @file          : helper.js
*/
const sendingEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  ejs.renderFile('app/view/sendEmail.ejs', (error, result) => {
    if (error) {
      logger.log('error', error);
    } else {
      const message = {
        from: process.env.EMAIL,
        to: data.email,
        subject: 'Re: Reset your password',
        html: `${result}<button><a href="${'http://localhost:3000/resetPassword/'}${generatingToken(data)}">Click here</a></button>`,

      };

      transporter.sendMail(message, (err, info) => {
        const sendEmailInfo = err ? logger.log('error', err) : logger.log('info', info);
        return sendEmailInfo;
      });
    }
  });
};

module.exports = {
  authSchema,
  generatingToken,
  verifyingToken,
  sendingEmail,
  checkIdField,
  updateNoteField,
};

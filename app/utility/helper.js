/* eslint-disable linebreak-style */

const Joi = require('joi');

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

module.exports = {
  authSchema,
};

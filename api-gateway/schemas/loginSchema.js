const Joi = require('joi');


/**
 * Login schema
 */
const schema = Joi.object({
    email: Joi.string()
              .email()
              .required(),
    pass: Joi.string()
             .required()
             .min(6)                   
});


module.exports = schema;
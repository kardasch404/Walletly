const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    fname: Joi.string().required(),
    lname: Joi.string().required()
});

module.exports = registerSchema;
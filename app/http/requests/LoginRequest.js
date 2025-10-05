const Joi = require('joi');

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const validateLogin = (data) => {
    return loginSchema.validate(data);
};

module.exports = { validateLogin };
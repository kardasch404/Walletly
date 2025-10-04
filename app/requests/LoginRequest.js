const Joi = require('joi');


const loginSchema = {
    email: Joi.string().email().required(),
    password: Joi.string().required()
}

const validateLogin = (data) => {
    return Joi.object(loginSchema).validate(data, { abortEarly: false });
};

module.exports = { loginSchema, validateLogin };
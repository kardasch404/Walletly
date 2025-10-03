const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    fname: Joi.string().required(),
    lname: Joi.string().required()
});

const validateRegister = (data) => {
    return registerSchema.validate(data, { abortEarly: false });
};

module.exports = { registerSchema, validateRegister };
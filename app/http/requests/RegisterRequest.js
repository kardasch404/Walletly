const Joi = require('joi');

const registerSchema = Joi.object({
    fname: Joi.string().required(),
    lname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const validateRegister = (data) => {
    return registerSchema.validate(data);
};

module.exports = { validateRegister };
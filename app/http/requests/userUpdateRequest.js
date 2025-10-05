const Joi = require('joi');

const userUpdateSchema = Joi.object({
    userId : Joi.string().required(),
    fname : Joi.string().allow(null),
    lname : Joi.string().allow(null),
    email : Joi.string().email().required(),
});

const validateUserUpdate = (data) => {
    const { error } = userUpdateSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

module.exports = { validateUserUpdate };
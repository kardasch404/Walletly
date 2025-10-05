const Joi = require('joi');

const userUpdatePasswordSchema = Joi.object({
    currentPassword: Joi.string().required().messages({
        'string.empty': 'Current password is required',
        'any.required': 'Current password is required'
    }),
    newPassword: Joi.string().min(6).required().messages({
        'string.empty': 'New password is required',
        'string.min': 'New password must be at least 6 characters long',
        'any.required': 'New password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('newPassword')).required().messages({
        'any.only': 'Passwords do not match',
        'any.required': 'Confirm password is required'
    })
});

const validateUserUpdatePassword = (data) => {
    const { error } = userUpdatePasswordSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
    return true;
};

module.exports = { validateUserUpdatePassword };
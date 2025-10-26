const Joi = require('joi');

const categoryStoreSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow('').optional(),
    type: Joi.string().valid('expense', 'income').optional()
}).unknown(true);

const validateCategoryStore = (data) => {
    const { error } = categoryStoreSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

module.exports = { validateCategoryStore };
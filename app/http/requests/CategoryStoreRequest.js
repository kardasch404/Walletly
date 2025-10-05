const Joi = require('joi');

const categoryStoreSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    type: Joi.string().required()
});

const validateCategoryStore = (data) => {
    const { error } = categoryStoreSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

module.exports = { validateCategoryStore };
const Joi = require('joi');

const budgetStoreSchema = Joi.object({
    category_id: Joi.string().required(),
    monthlyLimit: Joi.number().positive().required(),
    mounth: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(2020).required()
});

const validateBudgetStore = (data) => {
    const { error } = budgetStoreSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

module.exports = { validateBudgetStore };
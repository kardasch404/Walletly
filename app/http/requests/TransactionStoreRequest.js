const Joi = require('joi');

const transactionStoreSchema = Joi.object({
    category_id: Joi.string().required(),
    amount: Joi.number().positive().required(),
    description: Joi.string().allow('').optional(),
    type: Joi.string().valid('income', 'expense').required(),
    transactionDate: Joi.date().required()
}); 


const validateTransactionStore = (data) => {
    const { error } = transactionStoreSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

module.exports = { validateTransactionStore };
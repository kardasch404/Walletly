const Joi = require('joi');

const walletStoreSchema = Joi.object({
    cardNumber: Joi.string().length(16).pattern(/^[0-9]+$/).required(),
    amount: Joi.number().positive().required(),
    mounth: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(2020).max(2030).required()
});

const validateWalletStore = (data) => {
    const { error } = walletStoreSchema.validate(data);
    if (error) {
        throw new Error(error.details[0].message);
    }
};

module.exports = { validateWalletStore };
const Wallet = require('../models/Wallet');

class WalletRepository {

    async create(data) {
        try {
            const wallet = await Wallet.create({
                id: data.id,
                user_id: data.user_id,
                cardNumber: data.cardNumber,
                amount: data.amount,
                mounth: data.mounth,
                year: data.year
            });
            return wallet.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async getAllByUserId(userId) {
        try {
            const wallets = await Wallet.findAll({
                where: { user_id: userId }
            });
            return wallets.map(wallet => wallet.toJSON());
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WalletRepository;
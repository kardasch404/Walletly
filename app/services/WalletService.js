class WalletService {
    #walletRepository;

    constructor(walletRepository) {
        this.#walletRepository = walletRepository;
    }

    async create(data, userId) {
        try {
            const walletData = {
                id: Math.random().toString(36).substring(2, 38),
                cardNumber: data.cardNumber,
                amount: data.amount,
                mounth: data.mounth,
                year: data.year,
                user_id: userId
            };
            
            return await this.#walletRepository.create(walletData);
        } catch (error) {
            throw error;
        }
    }

    async getAllWalletsFromUser(userId) {
        try {
            return await this.#walletRepository.getAllByUserId(userId);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = WalletService;
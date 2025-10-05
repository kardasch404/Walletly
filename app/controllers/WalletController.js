class WalletController {
    #walletService;

    constructor(walletService) {
        this.#walletService = walletService;
    }

    async createWallet(req, res) {
        try {
            const data = req.body;
            const userId = req.session.userId;
            
            if (!userId) {
                return res.status(400).json({ error: 'User not found' });
            }

            const wallet = await this.#walletService.create(data, userId);
            return res.redirect('/wallet');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async getAllWalletsFromUser(req, res) {
        try {
            const userId = req.session.userId;

            if (!userId) {
                return res.redirect('/login');
            }

            const wallets = await this.#walletService.getAllWalletsFromUser(userId);
            return res.render('wallets', {
                title: 'My Wallets - Walletly',
                wallets: wallets
            });
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = WalletController;
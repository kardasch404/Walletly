class AuthController {
    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        try {
            const data = req.body;
            const user = await this.userService.register(data);
            return res.json(user);
        } catch (error) {
            return res.status(400).json({
                error: error.message 
            });
        }
    }
}

module.exports = AuthController;
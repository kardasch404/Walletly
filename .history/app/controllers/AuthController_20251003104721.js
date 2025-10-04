class AuthController {

    constructor(userService) {
        this.userService = userService;
    }

    async register(req, res) {
        try {
            const data = req.body;
            const user = await this.userService.register(data);
            return res.json({
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                email: user.email
            });
        } catch (error) {
            return res.json({
                error: error.message
            });
        }
    }

    async login(req, res) {
        try {
            const data = req.body;
            const user = await this.userService.login(data);
            return res.json(user);
        } catch (error) {
            return res.json({
                error: error.message
            });
        }
    }
}

module.exports = AuthController;
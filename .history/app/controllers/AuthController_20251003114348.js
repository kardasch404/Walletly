class AuthController {

    #userServise;

    constructor(userServise) {
        this.#userServise = userServise;
    }

    async register(req, res) {
        try {
            const data = req.body;
            const user = await this.#userServise.register(data);
            console.timeLog()
            return res.redirect('/login');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const data = req.body;
            const user = await this.#userServise.login(data.email, data.password);
            
            req.session.userId = user.id;
            req.session.user = {
                id: user.id,
                fname: user.fname,
                lname: user.lname,
                email: user.email
            };
            
            return res.redirect('/dashboard');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    logout(req, res) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not log out' });
            }
            return res.redirect('/');
        });
    }
}

module.exports = AuthController;
class AuthController {

    #userServise;

    constructor(userServise) {
        this.#userServise = userServise;
    }

    async register(req, res) {
        try {
            const data = req.body;
            const user = await this.#userServise.register(data);
            // console.log(user);
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
                email: user.email,
                image: user.image
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

    async updateUserProfile(req, res) {
        try {
            const data = req.body;
            await this.#userServise.updateUserProfile(data);
            
            // Update session with new data
            req.session.user.fname = data.fname;
            req.session.user.lname = data.lname;
            req.session.user.email = data.email;
            
            return res.redirect('/settings');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }

    async updateUserPhoto(req, res) {
        try {
            const data = {
                userId: req.session.userId,
                image: req.file ? req.file.filename : null
            };
            
            if (!data.image) {
                return res.status(400).json({ error: 'No image uploaded' });
            }
            
            await this.#userServise.UpdateUserPhoto(data);
            
            // Update session with new image
            req.session.user.image = data.image;
            
            return res.redirect('/settings');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController;
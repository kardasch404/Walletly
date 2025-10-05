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
        console.log('Logout called, session before destroy:', req.session.userId);
        req.session.destroy((err) => {
            if (err) {
                console.log('Session destroy error:', err);
                return res.status(500).json({ error: 'Could not log out' });
            }
            console.log('Session destroyed, redirecting to /');
            res.clearCookie('connect.sid'); // Clear session cookie
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

    async updatePassword(req, res) {
        try {
            const { currentPassword, newPassword } = req.body;
            const userId = req.session.userId;
            
            await this.#userServise.updatePassword(userId, currentPassword, newPassword);
            return res.redirect('/settings');
        } catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}

module.exports = AuthController;
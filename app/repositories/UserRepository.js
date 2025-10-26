const User = require('../models/User');

class UserRepository {
    async create(data) {
        try {
            const user = await User.create({
                id: data.id,
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                currency: data.currency,
                password: data.password,
                image: data.image
            });
            return user.toJSON();
        } catch (error) {
            throw error;
        }
    }

    async findByEmail(email) {
        try {
            const user = await User.findOne({
                where: { email: email }
            });
            return user ? user.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }

    async findById(id) {
        try {
            const user = await User.findOne({
                where: { id: id }
            });
            return user ? user.toJSON() : null;
        } catch (error) {
            throw error;
        }
    }

    async update(userData) {
        try {
            const [updated] = await User.update({
                fname: userData.fname,
                lname: userData.lname,
                email: userData.email
            }, {
                where: { id: userData.id }
            });
            return updated > 0;
        } catch (error) {
            throw error;
        }
    }

    async updateImage(userData) {
        try {
            const [updated] = await User.update({
                image: userData.image
            }, {
                where: { id: userData.id }
            });
            return updated > 0;
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(userId, hashedPassword) {
        try {
            const [updated] = await User.update({
                password: hashedPassword
            }, {
                where: { id: userId }
            });
            return updated > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserRepository;
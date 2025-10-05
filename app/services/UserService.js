const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');

class UserService {
    #userRepository;

    constructor(userRepository) {
        this.#userRepository = userRepository;
    }

    async register(data) {
        try {
            const hashedPassword = await bcrypt.hash(data.password, 16);
         
            const userData = {
                id: Math.random().toString(36).substring(2, 12),
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                currency: 'MAD',
                password: hashedPassword,
                image: null
            };
            
            const result = await this.#userRepository.create(userData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        const user = await this.#userRepository.findByEmail(email);
        if (!user) {
            throw new Error('User not found');
        }
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Incorrect password');
        }
        return user;
    }

    async getUserById(id) {
        return await this.#userRepository.findById(id);
    }

    async updateUserProfile (data) {
        try {
            const userData = {
                id: data.userId,
                fname: data.fname,
                lname: data.lname,
                email: data.email,
            };

            const result = await this.#userRepository.update(userData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async UpdateUserPhoto (image) {
        try {
            const userData = {
                id: image.userId,
                image: image.image
            };

            const result = await this.#userRepository.updateImage(userData);
            return result;
        } catch (error) {
            throw error;
        }
    }

    async updatePassword(userId, currentPassword, newPassword) {
        try {
            const user = await this.#userRepository.findById(userId);
            const isValidPassword = await bcrypt.compare(currentPassword, user.password);
            if (!isValidPassword) {
                throw new Error('Current password is incorrect');
            }
            
            const hashedPassword = await bcrypt.hash(newPassword, 16);
            return await this.#userRepository.updatePassword(userId, hashedPassword);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = UserService;
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
                id: uuidv4(),
                fname: data.fname,
                lname: data.lname,
                email: data.email,
                currency: 'EUR',
                password: hashedPassword,
                image: null
            };
            
            const result = await this.#userRepository.create(userData);
            console.log('Repository create result:', result);
            return result;
        } catch (error) {
            console.error('UserService register error:', error);
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
}

module.exports = UserService;
const bcrypt = require('bcrypt');

class UserService {   
    constructor(userRepository) {
        this.userRepository = userRepository;
    }

    async register(data) {
        const { v4: uuidv4 } = await import('uuid');
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const userData = {
            id: uuidv4(),
            fname: data.fname,
            lname: data.lname,
            email: data.email,
            password: hashedPassword,
            image: null
        };
        return this.userRepository.create(userData);
    }

    async login(data) {
        const user = await this.userRepository.findByEmail(data.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        
        const isValidPassword = await bcrypt.compare(data.password, user.password);
        if (!isValidPassword) {
            throw new Error('Invalid email or password');
        }
        
        return {
            id: user.id,
            fname: user.fname,
            lname: user.lname,
            email: user.email
        };
    }
}

module.exports = UserService;
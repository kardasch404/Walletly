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
}

module.exports = UserService;
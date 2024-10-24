const userRepository =require('../Repository/userRepository')
const jwtService = require('./../../Services/JwtService')
const bcrypt = require('bcryptjs');


const loginUser = async (email, password) => {
    try {
        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwtService.generateToken({ id: user.id, role: 'user' });

        return { token, user: { id: user.id, email: user.email, role: 'user' } };
    } catch (error) {
        console.error('Error in login user:', error.message);
        throw new Error('Error logging in user');
    }
};

const userData =  async (email) => {
    try {
        const user = await userRepository.findUserByEmail(email);

        if (!user) {
            throw new Error('Invalid credentials');
        }

        return {user};
    } catch (error) {
        console.error('Error in fetching user:', error.message);
        throw new Error('Error fetching in user');
    }
};

module.exports={
    loginUser,
    userData,
}

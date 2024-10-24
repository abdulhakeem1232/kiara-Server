const clientRepository =require('../Repository/clientRepository')
const jwtService = require('./../../Services/JwtService')
const bcrypt = require('bcryptjs');


const loginClient = async (email, password) => {
    try {
        const client = await clientRepository.findClientByEmail(email);

        if (!client) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, client.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwtService.generateToken({ id: client.id, role: 'client' });

        return { token, client: { id: client.id, email: client.email, role: 'client' } };
    } catch (error) {
        console.error('Error in login client:', error.message);
        throw new Error('Error logging in client');
    }
};

const clientData =  async (email) => {
    try {
        const client = await clientRepository.findClientByEmail(email);

        if (!client) {
            throw new Error('Invalid credentials');
        }

        return {client };
    } catch (error) {
        console.error('Error in fetching client:', error.message);
        throw new Error('Error fetching in client');
    }
};

module.exports={
    loginClient,
    clientData,
}

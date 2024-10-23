const adminRepository = require('./../Repository/adminRepositry')
const jwtService = require('./../../Services/JwtService')
const bcrypt = require('bcryptjs');

const createAdmin = async (email, password) => {
    try {
        const newUser = await adminRepository.createAdmin( email, password );
        return newUser;
    } catch (error) {
        console.error('Error in adminUsecases:', error.message);
        throw new Error('Error creating admin'); 
    }
};

const loginAdmin = async (email, password) => {
    try {
        const admin = await adminRepository.findAdminByEmail(email);

        if (!admin) {
            throw new Error('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, admin.password);
        
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }

        const token = jwtService.generateToken({ id: admin.id, role: 'admin' });

        return { token, admin: { id: admin.id, email: admin.email, role: 'admin' } };
    } catch (error) {
        console.error('Error in loginAdmin:', error.message);
        throw new Error('Error logging in admin');
    }
};

const createClient=async(name,email,phoneNumber,industry,password)=>{
    try{
        const newClient = await adminRepository.createClient(name, email, phoneNumber, industry, password);
        return newClient;
    }catch(error){
        console.error('Error in admin creating client:', error.message);
        throw new Error('Error in admin creating client');
    }
}

const createUser=async(name,email,phoneNumber,client_id,password)=>{
    try{
        const newUser = await adminRepository.createUser(name, email, phoneNumber, client_id, password);
        return newUser;
    }catch(error){
        console.error('Error in admin creating user:', error.message);
        throw new Error('Error in admin creating user');
    }
}

module.exports = {
    createAdmin,
    loginAdmin,
    createClient,
    createUser,
}

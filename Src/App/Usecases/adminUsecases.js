const adminRepository = require('./../Repository/adminRepositry')
const jwtService = require('./../../Services/JwtService')
const bcrypt = require('bcryptjs');
const { emitClientDataUpdate,emitUserDataUpdate,emitClientDeleted,emitUserDeleted} = require('../../Config/socket')

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

const getClients= async()=>{
    try{
        const clients = await adminRepository.getClients();
        return clients;
    }catch(error){
        console.error('Error in fetching client list:', error.message);
        throw new Error('Error in fetching client list');
    }
}

const getUsers= async()=>{
    try{
        const users = await adminRepository.getUsers();
        return users;
    }catch(error){
        console.error('Error in fetching users list:', error.message);
        throw new Error('Error in fetching users list');
    }
}

const updateClient = async (clientId, updatedData) => {
    try {
        const updatedClient = await adminRepository.updateClient(clientId, updatedData);
        emitClientDataUpdate(updatedClient)
        return updatedClient;
    } catch (error) {
        console.error('Error in updating client:', error.message);
        throw new Error('Error updating client');
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const updatedUser = await adminRepository.updateUser(userId, updatedData);
        emitUserDataUpdate(updatedUser)
        return updatedUser;
    } catch (error) {
        console.error('Error in updating user:', error.message);
        throw new Error('Error updating user');
    }
};

const deleteClient = async (clientId) => {
    try {
        const deletedClient = await adminRepository.deleteClientById(clientId);
        
        if (!deletedClient) {
            throw new Error('Client not found');
        }
        emitClientDeleted(clientId)
        return deletedClient; 
    } catch (error) {
        console.error('Error in deleting client:', error.message);
        throw new Error('Error deleting client');
    }
};

const deleteUser = async (userId) => {
    try {
        const deletedUser = await adminRepository.deleteUserById(userId);
        
        if (!deletedUser) {
            throw new Error('User not found');
        }
        emitUserDeleted(userId)
        return deletedUser; 
    } catch (error) {
        console.error('Error in deleting user:', error.message);
        throw new Error('Error deleting user');
    }
};

module.exports = {
    createAdmin,
    loginAdmin,
    createClient,
    createUser,
    getClients,
    getUsers,
    updateClient,
    deleteClient,
    updateUser,
    deleteUser,
}

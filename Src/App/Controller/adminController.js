const adminUsecases = require('./../Usecases/adminUsecases')

const createAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const newAdmin = await adminUsecases.createAdmin(email, password);
        res.status(201).json(newAdmin);
    } catch (error) {
        next(error);
    }
};

const loginAdmin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);
        
        const { token, admin } = await adminUsecases.loginAdmin(email, password);
        res.status(200).json({ token, admin });
    } catch (error) {
        res.status(401).json({ message: 'Invalid credentials' });
    }
};

const createClient = async (req, res, next) => {
    try {
        const { name, email, phoneNumber, industry, password } = req.body;
        const newClient = await adminUsecases.createClient(name, email, phoneNumber, industry, password);
        res.status(201).json(newClient);
    } catch (error) {
        next(error);
    }
};

const createUser = async (req, res, next) => {
    try {
        const { username, email, phoneNumber, client_id, password } = req.body;
        const newUser = await adminUsecases.createUser(username, email, phoneNumber, client_id, password);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

const getClient = async (req, res, next) => {
    try {
        const clients = await adminUsecases.getClients();
        res.status(201).json(clients);
    } catch (error) {
        next(error);
    }
};

const getUsers = async (req, res, next) => {
    try {
        const users = await adminUsecases.getUsers();
        res.status(201).json(users);
    } catch (error) {
        next(error);
    }
};


const updateClient = async (req, res, next) => {
    const { clientId } = req.params; 
    const updatedData = req.body; 
    try {
        const updatedClient = await adminUsecases.updateClient(clientId, updatedData);
        if (updatedClient) {
            res.status(200).json(updatedClient);
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        next(error); 
    }
};
const updateUser = async (req, res, next) => {
    const { userId } = req.params; 
    const updatedData = req.body; 
    try {
        const updateduser = await adminUsecases.updateUser(userId, updatedData);
        if (updateduser) {
            res.status(200).json(updateduser);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error); 
    }
};

const deleteClient = async (req, res, next) => {
    const { clientId } = req.params;  
    try {
        const deletedClient = await adminUsecases.deleteClient(clientId);
        if (deletedClient) { 
            res.status(200).json({ message: 'Client deleted successfully' }); 
        } else {
            res.status(404).json({ message: 'Client not found' });
        }
    } catch (error) {
        next(error);
    }
};

const deleteUser = async (req, res, next) => {
    const { userId } = req.params;  
    try {
        const deletedUser = await adminUsecases.deleteUser(userId);
        if (deletedUser) { 
            res.status(200).json({ message: 'User deleted successfully' }); 
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createAdmin,
    loginAdmin,
    createClient,
    createUser,
    getClient,
    getUsers,
    updateClient,
    deleteClient,
    updateUser,
    deleteUser,
}

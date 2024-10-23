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
        const { name, email, phoneNumber, client_id, password } = req.body;
        const newUser = await adminUsecases.createUser(name, email, phoneNumber, client_id, password);
        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createAdmin,
    loginAdmin,
    createClient,
    createUser
}

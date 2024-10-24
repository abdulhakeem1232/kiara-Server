const {pool} = require('../../Config/dbConncetion')
const bcrypt = require('bcryptjs');

const saltRounds = 10;

const createAdmin = async(email,password)=>{
    try{
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
           'INSERT INTO admins (email, password) VALUES ($1, $2) RETURNING *',
            [email, hashedPassword]
        )
        console.log('result',result)
        return result.rows[0];
    }catch(error){
        throw new Error('Database error: Unable to create user');
    }
}

const findAdminByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM admins WHERE email = $1', [email]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Database error: Unable to find admin');
    }
}

const findClientByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Database error: Unable to find client');
    }
};

    const createClient=async(name,email,phoneNumber,industry,password)=>{
        try {
            const existingClient = await findClientByEmail(email);
            if (existingClient) {
                return { success: false, message: 'Email already exists' };
            }

            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const result = await pool.query(
            'INSERT INTO clients (name, email, industry,mobile_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [name, email, industry, phoneNumber,  hashedPassword]
            );

            return result.rows[0]; 
        } catch (error) {
            throw new Error(error.message || 'Database error: Unable to create client');
        }
    }

const findUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Database error: Unable to find user');
    }
};

const createUser=async(name,email,phoneNumber,client_id,password)=>{
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return { success: false, message: 'Email already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const result = await pool.query(
           'INSERT INTO users (name, email,mobile_number,client_id, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, phoneNumber,client_id, hashedPassword]
        );

        return result.rows[0]; 
    } catch (error) {
        throw new Error(error.message || 'Database error: Unable to create user');
    }
}

const getClients = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM clients ');
        return result.rows; 
    } catch (error) {
        throw new Error('Database error: Unable to fetch clients');
    }
};

const getUsers = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users ');
        return result.rows; 
    } catch (error) {
        throw new Error('Database error: Unable to fetch users');
    }
};

const updateClient = async (clientId, updatedData) => {
    try {
        const result = await pool.query(
            'UPDATE clients SET name = COALESCE($1, name), email = COALESCE($2, email), mobile_number = COALESCE($3, mobile_number), industry = COALESCE($4, industry) WHERE id = $5 RETURNING *',
            [updatedData.name, updatedData.email, updatedData.phoneNumber, updatedData.industry, clientId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in admin repository updating client:', error.message);
        throw new Error('Error updating client in repository');
    }
};

const updateUser = async (userId, updatedData) => {
    try {
        const result = await pool.query(
            'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), mobile_number = COALESCE($3, mobile_number),  client_id= COALESCE($4, client_id) WHERE id = $5 RETURNING *',
            [updatedData.username, updatedData.email, updatedData.phoneNumber, updatedData.client, userId]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error in admin repository updating user:', error.message);
        throw new Error('Error updating user in repository');
    }
};

const deleteClientById = async (clientId) => {
    try {
        const result = await pool.query(
            'DELETE FROM clients WHERE id = $1 RETURNING *',
            [clientId]
        );
        return result.rows[0]; 
    } catch (error) {
        console.error('Error deleting client:', error.message);
        throw new Error('Database error: Unable to delete client');
    }
};

const deleteUserById = async (userId) => {
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [userId]
        );
        return result.rows[0]; 
    } catch (error) {
        console.error('Error deleting user:', error.message);
        throw new Error('Database error: Unable to delete user');
    }
};

module.exports ={
    createAdmin,
    findAdminByEmail,
    createClient,
    createUser,
    getClients,
    getUsers,
    updateClient,
    deleteClientById,
    updateUser,
    deleteUserById,
}

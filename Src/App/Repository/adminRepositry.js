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

const createClient = async (name, email, phoneNumber, industry, password) => {
    try {
        const existingClient = await findClientByEmail(email);
        if (existingClient) {
            await logOperation('client', 'failure', 'Email already exists');
            return { success: false, message: 'Email already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'INSERT INTO clients (name, email, industry, mobile_number, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, industry, phoneNumber, hashedPassword]
        );

        await logOperation('client', 'success');
        return result.rows[0];
    } catch (error) {
        await logOperation('client', 'failure', error.message);
        throw new Error('Database error: Unable to create client');
    }
};


const findUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Database error: Unable to find user');
    }
};

const createUser = async (name, email, phoneNumber, client_id, password) => {
    try {
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            await logOperation('user', 'failure', 'Email already exists');
            return { success: false, message: 'Email already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const result = await pool.query(
            'INSERT INTO users (name, email, mobile_number, client_id, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [name, email, phoneNumber, client_id, hashedPassword]
        );

        await logOperation('user', 'success');
        return result.rows[0];
    } catch (error) {
        await logOperation('user', 'failure', error.message);
        throw new Error('Database error: Unable to create user');
    }
};


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

        if (result.rowCount > 0) {
            await logOperation('client', 'success');
            return result.rows[0];
        } else {
            await logOperation('client', 'failure', 'Client not found');
            throw new Error('Client not found');
        }
    } catch (error) {
        await logOperation('client', 'failure', error.message);
        throw new Error('Error updating client in repository');
    }
};


const updateUser = async (userId, updatedData) => {
    try {
        const result = await pool.query(
            'UPDATE users SET name = COALESCE($1, name), email = COALESCE($2, email), mobile_number = COALESCE($3, mobile_number),  client_id= COALESCE($4, client_id) WHERE id = $5 RETURNING *',
            [updatedData.username, updatedData.email, updatedData.phoneNumber, updatedData.client, userId]
        );
        if (result.rowCount > 0) {
            await logOperation('user', 'success');
            return result.rows[0];
        } else {
            await logOperation('user', 'failure', 'User not found');
            throw new Error('User not found');
        }
    } catch (error) {
        await logOperation('user', 'failure', error.message);
        throw new Error('Error updating user in repository');
    }
};

const deleteClientById = async (clientId) => {
    try {
        const result = await pool.query(
            'DELETE FROM clients WHERE id = $1 RETURNING *',
            [clientId]
        );

        if (result.rowCount > 0) {
            await logOperation('client', 'success');
            return result.rows[0];
        } else {
            await logOperation('client', 'failure', 'Client not found');
            throw new Error('Client not found');
        }
    } catch (error) {
        await logOperation('client', 'failure', error.message);
        throw new Error('Database error: Unable to delete client');
    }
};


const deleteUserById = async (userId) => {
    try {
        const result = await pool.query(
            'DELETE FROM users WHERE id = $1 RETURNING *',
            [userId]
        );
        if (result.rowCount > 0) {
            await logOperation('user', 'success');
            return result.rows[0];
        } else {
            await logOperation('user', 'failure', 'Client not found');
            throw new Error('User not found');
        }
    } catch (error) {
        await logOperation('user', 'failure', error.message);
        throw new Error('Database error: Unable to delete user');
    }
};

const logOperation = async (targetType, status, errorMessage = null) => {
    try {
        await pool.query(
            'INSERT INTO operation_logs (target_type, status, error_message) VALUES ($1, $2, $3)',
            [targetType, status, errorMessage]
        );
    } catch (error) {
        console.error('Error logging operation:', error.message);
    }
};

const getDailyMetrics = async () => {
    const query = `
        SELECT DATE(created_at) AS date,target_type,status,COUNT(*) AS count FROM operation_logs GROUP BY DATE(created_at), target_type, status
        ORDER BY DATE(created_at);
    `;

    try {
        const result = await pool.query(query);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching daily metrics:', error.message);
        throw new Error('Database error: Unable to fetch daily metrics');
    }
};

const getWeeklyMetrics = async () => {
    const query = `
        SELECT DATE_TRUNC('week', created_at) AS week,target_type,status,COUNT(*) AS count FROM operation_logs GROUP BY DATE_TRUNC('week', created_at), target_type, status
        ORDER BY week;`;

    try {
        const result = await pool.query(query);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching weekly metrics:', error.message);
        throw new Error('Database error: Unable to fetch weekly metrics');
    }
};

const getMonthlyMetrics = async () => {
    const query = `
        SELECT DATE_TRUNC('month', created_at) AS month,target_type,status,COUNT(*) AS count FROM operation_logs GROUP BY DATE_TRUNC('month', created_at), target_type, status
        ORDER BY month;`;
    try {
        const result = await pool.query(query);
        return result.rows; 
    } catch (error) {
        console.error('Error fetching monthly metrics:', error.message);
        throw new Error('Database error: Unable to fetch monthly metrics');
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
    getDailyMetrics,
    getWeeklyMetrics,
    getMonthlyMetrics
}

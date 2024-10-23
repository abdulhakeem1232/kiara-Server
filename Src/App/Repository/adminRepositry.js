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
            throw new Error('Email already exists');
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
            throw new Error('Email already exists');
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

module.exports ={
    createAdmin,
    findAdminByEmail,
    createClient,
    createUser,
}

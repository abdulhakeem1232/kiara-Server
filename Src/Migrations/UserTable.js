const { pool } = require('../Config/dbConncetion');

const createUsersTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            mobile_number VARCHAR(15),
            client_id INTEGER REFERENCES clients(id),
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

    try {
        await pool.query(query);
        console.log('Users table created successfully!');
    } catch (error) {
        console.error('Error creating users table:', error);
    }
};

module.exports = createUsersTable

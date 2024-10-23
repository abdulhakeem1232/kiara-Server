const { pool } = require('../Config/dbConncetion');

const createClientsTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS clients (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            industry VARCHAR(100),
            mobile_number VARCHAR(15),
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

    try {
        await pool.query(query);
        console.log('Clients table created successfully!');
    } catch (error) {
        console.error('Error creating clients table:', error);
    }
};

module.exports = createClientsTable

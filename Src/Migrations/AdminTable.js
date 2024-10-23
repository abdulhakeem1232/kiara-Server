const { pool } = require('../Config/dbConncetion');

const createAdminsTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS admins (
        id SERIAL PRIMARY KEY,
        email VARCHAR(100) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
`;

    try {
        await pool.query(query);
        console.log('Admins table created successfully!');
    } catch (error) {
        console.error('Error creating admins table:', error);
    }
};

module.exports = createAdminsTable

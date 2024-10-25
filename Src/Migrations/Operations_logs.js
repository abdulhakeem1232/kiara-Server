const { pool } = require('../Config/dbConncetion');

const createOperation_logsTable = async () => {
    const query = `
    CREATE TABLE IF NOT EXISTS operation_logs (
    id SERIAL PRIMARY KEY, 
    target_type VARCHAR(50),                     
    status VARCHAR(20),           
    error_message TEXT,           
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

`;

    try {
        await pool.query(query);
        console.log('Operation table created successfully!');
    } catch (error) {
        console.error('Error creating Operation table:', error);
    }
};

module.exports = createOperation_logsTable

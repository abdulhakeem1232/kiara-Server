const {pool} = require('../../Config/dbConncetion')



const findClientByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM clients WHERE email = $1', [email]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Database error: Unable to find clients');
    }
}



module.exports={
    findClientByEmail,
}

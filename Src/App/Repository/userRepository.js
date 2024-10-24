const {pool} = require('../../Config/dbConncetion')



const findUserByEmail = async (email) => {
    try {
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0]; 
    } catch (error) {
        throw new Error('Database error: Unable to find users');
    }
}



module.exports={
    findUserByEmail,
}

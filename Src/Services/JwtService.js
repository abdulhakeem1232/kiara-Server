const jwt = require('jsonwebtoken');

const secretKey = process.env.SECRET_KEY

const generateToken = (payload) => {
    return jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
};


module.exports = {
    generateToken,
};

const jwt = require('jsonwebtoken');
const jwtSecret = process.env.SECRET_KEY || 'your_jwt_secret_key';

const isAuthenticated = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; 

    if (!token) {
        console.log('no token');
        
        return res.status(401).json({ message: 'Unauthorized: No token provided' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded; 
        next();
    } catch (error) {
        console.error('JWT Authentication Error:', error.message);
        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
};

const authorizeRole = (requiredRole) => (req, res, next) => {
    if (!req.user || req.user.role !== requiredRole) {
        return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
};


module.exports={
    isAuthenticated,authorizeRole
}




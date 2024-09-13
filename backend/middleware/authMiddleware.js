const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    console.log('Received Token:', token); // Log token for debugging

    if (!token) return res.status(401).json({ message: 'Access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log('Decoded Token:', decoded); // Log decoded token for debugging
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token Verification Error:', error); // Log error for debugging
        res.status(401).json({ message: 'Invalid token' });
    }
};

module.exports = authMiddleware;

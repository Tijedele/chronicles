const jwt = require('jsonwebtoken');

const secretKey = process.env.JWT_SECRET_KEY

const generateToken = (userId) => {
    return jwt.sign({ userId }, secretKey, { expiresIn: '1d'})
};

module.exports = generateToken;
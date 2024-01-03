const jwt = require('jsonwebtoken');
const { User } = require("../db");
const JWT_SECRET_KEY = "basant"

function authMiddleware(req, res, next) {
    // Check if the authorization header is present
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ msg: 'Unauthorrdgdhized: No token provided' });
    }
    const username = jwt.decode(token)
    console.log(username)

    // Verify the token
    jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ msg: 'Unauthorized: Invalid token' });
        }
        // Continue to the next middleware or route handler
        next();
    });
}

module.exports = authMiddleware;

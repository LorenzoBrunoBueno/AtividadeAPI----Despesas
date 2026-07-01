const jwt = require('jsonwebtoken');
const config = require('../config/auth');

module.exports = function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(400).json({error: "Token não informado!"});
    }

    const [scheme, token] = authHeader.split('');

    if(scheme !== 'Bearer' || !token) {
        return res.status(400).json({ error: "Token mal formatado!" });
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        req.user = {
            id: decoded.id,
            name: decoded.name,
            email: decoded.email
        };

        return next();
    } catch(e) {
        next(e);
    }
}
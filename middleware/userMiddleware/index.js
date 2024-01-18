const jwt = require('jsonwebtoken');
require('dotenv').config();



function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    const JWTscret = process.env.JWTscret;
    if (authToken !== undefined) {

        const token = authToken.split(' ')[1];
        jwt.verify(token, JWTscret, (error, data) => {
            if (error) {
                res.json({ error: 'INVALID TOKEN' });
            } else {
                req.user = data;
                next();
            }
        })

    } else {
        res.json({ error: ' THERE NO TOKEN' });
    }
}



module.exports = auth;


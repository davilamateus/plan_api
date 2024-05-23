const jwt = require('jsonwebtoken');
require('dotenv').config();



function auth(req, res, next) {
    const authToken = req.headers['authorization'];
    console.log(authToken)
    const JWTscret = process.env.JWTscret;
    if (authToken !== undefined) {

        const token = authToken.split(' ')[1];
        jwt.verify(token, JWTscret, (error, data) => {
            if (error) {
                res.status(404).json({ error: 'INVALID TOKEN' });
            } else {
                req.user = data;
                next();
            }
        })

    } else {
        res.status(401).json({ error: ' THERE NO TOKEN' });
    }
}



module.exports = auth;


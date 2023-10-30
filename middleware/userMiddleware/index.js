const jwt = require('jsonwebtoken');
const JWTsecret = require('../JWTsecret');



function auth(req, res, next) {
    const authToken = req.headers['authorization'];

    if (authToken !== undefined) {

        const token = authToken.split(' ')[1];
        jwt.verify(token, JWTsecret, (error, data) => {
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


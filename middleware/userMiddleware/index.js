const jwt = require("jsonwebtoken");
require("dotenv").config();

function auth(req, res, next) {
    const authToken = req.headers["authorization"];
    const JWTscret = process.env.JWTscret;
    if (!authToken) {
        return res.status(401).json({ error: " THERE NO TOKEN" });
    }
    try {
        const token = authToken.split(" ")[1];
        jwt.verify(token, JWTscret, (error, data) => {
            if (error) {
                res.status(404).json({ error: "INVALID TOKEN" });
            } else {
                req.user = data;
                next();
            }
        });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
}

module.exports = auth;

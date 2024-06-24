const modelUser = require("../../../models/users");
const modelTrip = require("../../../models/trip");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const socialLogin = (req, res) => {
    const { email, name, socialId } = req.body;
    const JWTsecret = process.env.JWTscret;

    if (!email || !name) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelUser
            .findOne({
                where: {
                    email: email
                }
            })
            .then((data) => {
                if (data !== null) {
                    modelTrip
                        .findOne({
                            where: {
                                userId: data.id
                            }
                        })
                        .then((result) => {
                            const token = jwt.sign({ name: data.name, email: data.email, type: data.type, userId: data.id, time: new Date() }, JWTsecret, { expiresIn: "500h" });
                            if (result) {
                                res.status(200).json({ result: "Password correct", token: token });
                            } else {
                                res.status(201).json({ result: "There are no user details", token: token });
                            }
                        });
                } else {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(socialId, salt);
                    modelUser
                        .create({
                            name,
                            email,
                            status: 1,
                            type: 1,
                            password: hash
                        })
                        .then((result) => {
                            const token = jwt.sign({ name: result.name, email: result.email, type: 1, userId: result.id, time: new Date() }, JWTsecret, { expiresIn: "500h" });
                            res.status(201).json({ result: "There are no user details", token: token });
                        });
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { socialLogin };

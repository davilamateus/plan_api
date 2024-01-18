const express = require('express');
const router = express.Router();
const modelUser = require('../../models/users');
const modelUserDetails = require('./../../models/users_details');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const useCreateConfirmEmail = require('../../hooks/confirmEmail/useCreateConfirmEmail');
require('dotenv').config();
const JWTsecret = process.env.JWTsecret
router.post('/login/', (req, res) => {
    const { email, password } = req.body;
    if (email && password) {
        modelUser.findOne({
            where: {
                email: email
            }
        }).then((data) => {
            if (data !== null) {
                let correct = bcrypt.compareSync(password, data.password);
                if (correct) {
                    const token = jwt.sign({ name: data.name, email: data.email, type: data.type, userId: data.id, time: new Date() }, JWTsecret, { expiresIn: '500h' });
                    if (data.status == 1) {
                        modelUserDetails.findOne({
                            where: {
                                userId: data.id
                            }
                        }).then((result) => {
                            if (result) {
                                res.status(200).json({ message: 'Password correct', token: token });
                            } else {
                                res.status(201).json({ message: 'There are no user details', token: token });

                            }
                        })
                    } else if (data.status == 2) {
                        res.status(203).json({ error: 'User blocked' });
                    } else if (data.status == 0) {
                        useCreateConfirmEmail(data.id, email);
                        res.status(203).json({ error: 'User not confirm' });
                    }
                } else {
                    res.status(202).json({ message: 'Password incorrect' });
                }
            }
            else {
                res.status(404).json({ error: 'Not exist' });
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' });
    }
});

module.exports = router
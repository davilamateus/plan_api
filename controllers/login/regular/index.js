
const modelUser = require('../../../models/users');
const modelTrip = require('../../../models/trip');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { useCreateConfirmEmail } = require('../../../hooks/confirmEmail/useCreateConfirmEmail');
require('dotenv').config();

const regularLogin = (req, res) => {
    const JWTsecret = process.env.JWTscret
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
                        modelTrip.findOne({
                            where: {
                                userId: data.id
                            }
                        }).then((result) => {
                            if (result) {
                                res.status(200).json({ message: 'Password correct', result: token });
                            } else {
                                res.status(201).json({ message: 'There are no user details', result: token });

                            }
                        })
                    } else if (data.status == 2) {
                        res.status(203).json({ message: 'User blocked' });
                    } else if (data.status == 0) {
                        useCreateConfirmEmail(data.id, email);
                        res.status(203).json({ message: 'User not confirm' });
                    }
                } else {
                    res.status(202).json({ message: 'Password incorrect' });
                }
            }
            else {
                res.status(202).json({ message: 'Password incorrect' });
            }
        })
    } else {
        res.status(400).json({ message: 'Fault Informations' });
    }
}

module.exports = { regularLogin };
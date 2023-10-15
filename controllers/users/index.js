const express = require('express');
const router = express.Router();
const modelUser = require('./../../models/users');
const bcrypt = require('bcryptjs');
const UserCreateConfirmEmail = require('../../hooks/confirmEmail/useCreateConfirmEmail');
const auth = require('../../Middleware/userMiddleware')


router.post('/user/', (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        modelUser.findOne({
            where: {
                email: email
            }
        }).then((data) => {
            if (data) {
                res.status(203).json({ error: 'Used' })
            } else {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                modelUser.create({
                    name, email, status: 0, type: 1, password: hash
                })
                    .then((data) => {
                        res.status(200).json({ sucess: "Add" });
                        UserCreateConfirmEmail(data.id, email);
                    })
                    .catch((error) => { res.status(400).json(error) })
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});

router.patch('/user/', auth, (req, res) => {
    const { name, email, password } = req.body;
    if (name && email && password) {
        modelUser.findOne({
            where: {
                id: req.user.userId
            }
        }).then((data) => {
            if (data) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                modelUser.update({
                    name, email, password: hash
                },
                    {
                        where: {
                            id: req.user.userId
                        }
                    })
                    .then(() => { res.status(200).json({ sucess: "Updated" }) })
                    .catch((error) => { res.status(400).json(error) })
            } else {
                res.status(400).json('error')
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});

module.exports = router
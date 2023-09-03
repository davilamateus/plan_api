const express = require('express');
const router = express.Router();
const changePasswordlModel = require('../../models/forgetPassword');
const userModel = require('../../models/users');
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const auth = require('./../../Middleware/userMiddleware');



router.post('/forgetpassword/', (req, res) => {

    const { email } = req.body;
    var token = uuid.v4();

    if (email) {
        userModel.findOne({
            where: {
                email
            }
        }).then((data) => {
            if (data) {
                changePasswordlModel.create({
                    userId: data.id,
                    token: token,
                    valid: true
                });
                res.status(200).json({ success: 'Email Gered' });
            } else {
                res.status(404).json({ error: 'User not exist' });
            }
        }).catch((error) => res.json(error));

    } else {
        res.status(300).json({ error: 'Fault Infors' });

    }
})

router.patch('/forgetpassword/:token', (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    changePasswordlModel.findOne({
        where: {
            token
        }
    }).then((data) => {
        if (data) {
            if (data.valid == 1) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                userModel.update({
                    password: hash
                }, {
                    where: {
                        id: data.userId
                    }
                }).then(() => {
                    changePasswordlModel.update({
                        valid: false
                    },
                        {
                            where: {
                                userId: data.userId

                            }
                        })
                    res.status(200).json({ success: 'Password Change' })
                })
            } else {
                res.status(203).json({ error: 'Token Used' })

            }

        }
    })


});

module.exports = router;
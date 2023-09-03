const express = require('express');
const router = express.Router();
const confirmEmailModel = require('./../../models/confirmEmail');
const userModel = require('./../../models/users');


router.patch('/confirmemail/:token', (req, res) => {
    const { token } = req.params;

    confirmEmailModel.findOne({
        where: {
            token: token
        }
    }).then((data) => {
        if (data.valid) {
            userModel.update({
                status: 1
            },
                {
                    where: {
                        id: data.userId
                    }
                }).then((response) => {
                    res.status(200).json({ success: 'Validate Success' })

                })

        } else {
            res.status(203).json({ error: 'Token Used' })
        }
    }).catch((error) => {
        res.json(error);
    });




});

module.exports = router
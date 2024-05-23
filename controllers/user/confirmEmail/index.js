const express = require('express');
const modelConfirmEmail = require('./../../../models/confirmEmail');
const modelUser = require('./../../../models/users');

const confirmEmail = (req, res) => {
    const { token } = req.params;
    if (token) {
        modelConfirmEmail.findOne({
            where: {
                token
            }
        }).then((data) => {
            if (data.valid) {
                modelConfirmEmail.update({
                    valid: 0
                },
                    {
                        where: {
                            id: data.id
                        }
                    })
                modelUser.update({
                    status: 1
                }
                    ,
                    {
                        where: {
                            id: data.userId
                        }
                    })
                    .then(() => {
                        res.status(200)
                        res.json({ result: 'Success' })
                    })
                    .catch(error => {
                        res.status(400)
                        res.json({ result: error })
                    })
            } else {
                res.status(201)
                res.json({ result: 'Used' })
            }

        })
    }
}


module.exports = { confirmEmail };
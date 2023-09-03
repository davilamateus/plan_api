const express = require('express');
const router = express.Router();
const modelUser = require('../../models/users');
const modelUserDetails = require('./../../models/users_details');
const bcrypt = require('bcryptjs');
const auth = require('./../../Middleware/userMiddleware');


router.post('/userdetails/', auth, (req, res) => {
    const { photo, city_local, city_trip, when } = req.body;
    if (photo && city_local && city_trip && when) {
        modelUserDetails.create({
            photo, when, city_local, city_trip, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json('Fault Informations');

    }
});

router.get('/userdetails/', auth, (req, res) => {
    const userId = req.user.userId;
    if (userId !== null) {
        modelUserDetails.findOne({
            where: {
                userId: userId
            }
        })
            .then((data) => {
                res.status(200).json({
                    photo: data.photo,
                    city_local: data.city_local,
                    city_trip: data.city_trip,
                    when: data.when
                })
            })
            .catch((error) => { res.status(400).json(error) })

    }
    else {
        res.status(300).json('No Auth');
    }
});

router.patch('/userdetails/', auth, (req, res) => {
    const { photo, city_local, city_trip, when } = req.body;
    if (photo && city_local && city_trip && when) {
        modelUserDetails.findOne({
            where: {
                userId: req.user.userId
            }
        }).then((data) => {
            if (data) {
                modelUserDetails.update({
                    photo, city_local, city_trip, when
                },
                    {
                        where: {
                            userId: req.user.userId
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
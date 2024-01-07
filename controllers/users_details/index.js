const express = require('express');
const router = express.Router();
const modelUser = require('../../models/users');
const modelUserDetails = require('./../../models/users_details');
const auth = require('../../middleware/userMiddleware');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');


router.post('/userdetails/', auth, (req, res) => {
    const { photo, city_local, state_local, country_local, currency_local, city_trip, state_trip, country_trip, currency_trip, when, country_code, country_lat, country_lon } = req.body;
    if (city_local && country_local && city_trip && country_trip && when && country_code && currency_local && currency_trip && country_lon && country_lat) {
        modelUserDetails.create({
            photo, when, city_local, state_local, country_local, currency_local, city_trip, state_trip, country_trip, currency_trip, country_code, country_lon, country_lat, userId: req.user.userId
        })
            .then(() => {
                res.status(200).json({ sucess: "Add" })
            })
            .catch((error) => {
                console.log(error)
                res.status(400).json(error)
            })

    } else {
        res.status(400).json('Fault Informations');

    }
});

router.get('/userdetails/', auth, (req, res) => {
    const { userId } = req.user;
    if (userId) {
        modelUserDetails.findOne({
            where: {
                userId: userId
            }
        })
            .then((data) => {
                if (data) {
                    modelUser.findOne({
                        where: {
                            id: data.userId
                        }
                    }).then((result) => {
                        res.status(200).json({
                            email: result.email,
                            name: result.name,
                            photo: data.photo,
                            city_local: data.city_local,
                            state_local: data.state_local,
                            country_local: data.country_local,
                            currency_local: data.currency_local,
                            city_trip: data.city_trip,
                            state_trip: data.state_trip,
                            country_trip: data.country_trip,
                            currency_trip: data.currency_trip,
                            country_code: data.country_code,
                            country_lon: data.country_lon,
                            country_lat: data.country_lat,
                            when: data.when
                        })

                    })
                } else {
                    res.status(204).json({ error: 'User do not exist' })
                }

            })
            .catch((error) => { res.status(400).json(error) })

    }
    else {
        res.status(401).json('No Auth');
    }
});

router.patch('/userdetails/', auth, (req, res) => {
    const { photo, city_local, state_local, country_local, currency_local, city_trip, state_trip, country_trip, currency_trip, country_code, country_lon, country_lat, when } = req.body;
    modelUserDetails.findOne({
        where: {
            userId: req.user.userId
        }
    }).then((data) => {
        if (data) {
            if (photo, city_local, state_local, country_local, currency_local, city_trip, state_trip, country_trip, currency_trip, country_code, country_lon, country_lat, when) {
                modelUserDetails.update({
                    photo, city_local, state_local, country_local, currency_local, city_trip, state_trip, country_trip, currency_trip, country_code, country_lon, country_lat, when
                },
                    {
                        where: {
                            userId: req.user.userId
                        }
                    })
                    .then(() => { res.status(200).json({ sucess: "Updated" }) })
                    .catch((error) => { res.status(400).json(error) })
            }


            else {
                res.status(400).json('Falt Informations')
            }
        } else {
            res.status(400).json('error')
        }
    })
});

const storage = multer.diskStorage({
    destination: path.resolve('uploads/imagens/user'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            const fileExtension = path.extname(file.originalname);
            const newFileName = buf.toString('hex') + fileExtension;
            cb(null, newFileName);
        });
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 megabytes
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(new Error('Apenas imagens JPEG ou PNG são permitidas.'));
        }
    },
});

router.post('/user/photo', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }

    const fileName = req.file.filename;
    res.json({ fileName });
});

module.exports = router;
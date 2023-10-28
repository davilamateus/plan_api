const express = require('express');
const auth = require('./../../middleware/userMiddleware');
const router = express.Router();
const axios = require('axios');

router.get('/cities/autocomplete', (req, res) => {
    const { query } = req.query;
    const apiKey = 'pk.7f55c939bc5e3986aa3966cc209bcd60';


    const response = async () => await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json&tag=place:city&en`)
        .then((data) => {
            res.json(data.data)
        }).catch((error) => {
            res.json(error)
        })
    response()
});



module.exports = router




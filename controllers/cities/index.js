const express = require('express');
const auth = require('./../../middleware/userMiddleware');
const router = express.Router();
const axios = require('axios');
require('dotenv').config();


router.get('/cities/autocomplete', (req, res) => {
    const { query } = req.query;
    const apiKey = process.env.locationiq;


    const response = async () => await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json&tag=place:city&en`)
        .then((data) => {
            res.json(data.data)
        }).catch((error) => {
            res.json(error)
        })
    response()
});



router.get('/cities/advices', auth, async (req, res) => {
    const { local, category } = req.query;
    const apiKey = process.env.foursquare;

    const options = {
        url: `https://api.foursquare.com/v3/places/search?ll=${local}${category !== undefined ? `&categories=` + category : ''}`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: apiKey
        }
    };


    const response = await axios.request(options)
        .then((data) => {
            res.json(data.data.results)
        }).catch((error) => {
            res.json(error)
        })
    response

});

router.get('/cities/advices/img', auth, async (req, res) => {
    const { id } = req.query;
    const apiKey = process.env.foursquare;

    const options = {
        url: `https://api.foursquare.com/v3/places/${id}/photos`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: apiKey
        }
    };


    const response = await axios.request(options)
        .then((data) => {
            res.json(data.data)
        }).catch((error) => {
            res.json(error)
        })

});

router.get('/city/weather/', auth, async (req, res) => {
    const { country_slug, city } = req.query;

    const apiKey = process.env.openweathermap;

    async function requestApi() {

        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_slug}&appid=${apiKey}`
        fetch(api)
            .then(response => response.json())
            .then(result => {

                res.json(result).status(200)
            }
            )
            .catch(() => {
                setTimeout(() => {
                    requestApi()
                }, 5000);
            })

    }
    requestApi();


});



module.exports = router




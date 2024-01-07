const express = require('express');
const auth = require('./../../middleware/userMiddleware');
const router = express.Router();
const axios = require('axios');
const movieTrailer = require('movie-trailer')


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



router.get('/cities/advices', auth, async (req, res) => {
    const { local, category } = req.query;
    console.log(category)

    const options = {
        url: `https://api.foursquare.com/v3/places/search?ll=${local}${category !== undefined ? `&categories=` + category : ''}`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3vunVy0wzrw/xyKaZkOAVtFnLiGjnlZRB5lrnTm8E2Zg='
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

    const options = {
        url: `https://api.foursquare.com/v3/places/${id}/photos`,
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'fsq3vunVy0wzrw/xyKaZkOAVtFnLiGjnlZRB5lrnTm8E2Zg='
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

    async function requestApi(key) {
        console.log('keuyyyy', key)
        let key1 = '82dc6076ac2dc00fcd49a3b1d3f698fc';
        let key2 = '9e5266ada2921a65f9c3d982510cecaf';
        let api = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country_slug}&appid=${key}`
        fetch(api)
            .then(response => response.json())
            .then(result => {

                if (result.cod == 429) {
                    requestApi('9e5266ada2921a65f9c3d982510cecaf');
                } else {
                    res.json(result).status(200)

                }
            }
            )
            .catch(() => {
                setTimeout(() => {
                    requestApi()
                }, 5000);
            })

    }
    requestApi('82dc6076ac2dc00fcd49a3b1d3f698fc');


});



module.exports = router




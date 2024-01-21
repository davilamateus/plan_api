const express = require('express');
const router = express.Router();
const axios = require('axios');
const { RadioBrowserApi } = require('radio-browser-api')


router.get('/radio/', (req, res) => {
    const { country } = req.query;
    const api = new RadioBrowserApi('My Radio App')
    console.log(country)

    async function stations() {
        await api.searchStations({
            countryCode: country,
            limit: 30,
            offset: 0
        }).then((result) => {
            let array = []
            result.map((item) => {
                if (item.favicon !== '') {
                    array.push(item);
                }

            })
            res.json(array).status(200);
        }).catch(() => {
            console.log('Radio Erro ', error)

        })

    }
    stations()
});





module.exports = router




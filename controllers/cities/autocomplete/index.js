const axios = require('axios');
require('dotenv').config();

const citiesAutocomplete = (req, res) => {
    const { query } = req.query;
    const apiKey = process.env.locationiq;
    if (query.length > 3) {
        const response = async () => await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json`)
            .then((data) => res.status(200).json({ result: data.data }))
            .catch((error) => {
                res.status(400).json({ result: error })
            });
        response()
    } else {
        res.status(400).json({ result: 'Fault Informations' })
    }

}

module.exports = { citiesAutocomplete };


const axios = require('axios');
const apiKey = process.env.openweathermap;

const citiesWeather = (req, res) => {
    const { country, city } = req.query;
    if (country && city) {
        const options = {
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`,
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        const response = async () => await axios.request(options)
            .then((data) => res.status(200).json(data.data))
            .catch((error) => res.status(400).json({ result: error }));

        response();
    } else {
        res.status(400).json({ result: 'Fault Informations' });
    }
}

module.exports = { citiesWeather };
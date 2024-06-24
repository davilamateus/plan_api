const axios = require("axios");
const apiKey = process.env.openweathermap;

const citiesWeather = (req, res) => {
    const { country, city } = req.query;
    if (!country || !city) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        const options = {
            url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`,
            method: "GET",
            headers: {
                accept: "application/json"
            }
        };
        const response = async () => await axios.request(options).then((data) => res.status(200).json(data.data));

        response();
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { citiesWeather };

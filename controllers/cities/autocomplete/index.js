const axios = require("axios");
require("dotenv").config();

const citiesAutocomplete = (req, res) => {
    const { query } = req.query;
    const apiKey = process.env.locationiq;
    if (!query) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        const response = async () => await axios.get(`https://api.locationiq.com/v1/autocomplete?key=${apiKey}&q=${query}&format=json`).then((data) => res.status(200).json({ result: data.data }));

        response();
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { citiesAutocomplete };

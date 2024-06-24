const axios = require("axios");

const citiesExchange = (req, res) => {
    const { tripCurrency, currentCurrency } = req.query;
    if (!currentCurrency || !tripCurrency) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        const options = {
            url: `https://economia.awesomeapi.com.br/json/daily/${tripCurrency}-${currentCurrency}/7`,
            method: "GET",
            headers: {
                accept: "application/json"
            }
        };
        const fetchExchangeRates = async () =>
            await axios.request(options).then((data) => {
                let result = [];
                for (value of data.data) {
                    result.push(value.high);
                }
                res.status(200).json(result);
            });
        return fetchExchangeRates();
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { citiesExchange };

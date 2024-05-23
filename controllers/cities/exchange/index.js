

const axios = require('axios');

const citiesExchange = (req, res) => {
    const { tripCurrency, currentCurrency } = req.query;
    if (currentCurrency && tripCurrency) {
        const options = {
            url: `https://economia.awesomeapi.com.br/json/daily/${tripCurrency}-${currentCurrency}/7`,
            method: 'GET',
            headers: {
                accept: 'application/json',
            }
        };
        const response = async () => await axios.request(options)
            .then((data) => {
                let result = [];
                for (value of data.data) {
                    result.push(value.high);
                }
                res.status(200).json(result)
            })
            .catch((error) => res.status(400).json({ result: error }));

        response();
    } else {
        res.status(400).json({ result: 'Fault Informations' });
    }
}

module.exports = { citiesExchange };
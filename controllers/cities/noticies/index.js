const axios = require('axios');
require('dotenv').config();

const noticies = (req, res) => {
    const { country, category, page } = req.query;
    const key1 = process.env.newsdata;
    const key2 = process.env.newsdata2;
    const key3 = process.env.newsdata3;


    if (country) {
        const response = async (key) => {

            await axios.get(`https://newsdata.io/api/1/news?apikey=${key}&country=${country}&image=1&${category !== undefined ? 'category=' + category : ''}${page !== undefined ? '&page=' + page : ''}`)
                .then((data) => res.status(200).json(data.data))
                .catch((error) => {
                    console.log(error)
                    if (error.response.status === 429) {
                        response(key2)

                    } else {
                        res.status(400).json(error)
                        response(key1)

                    }
                })
        }
        response(key3)
    } else {
        res.status(400).json({ result: 'Fault Informations' })
    }
}

module.exports = { noticies };
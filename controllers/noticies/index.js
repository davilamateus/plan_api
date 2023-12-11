const express = require('express');
const auth = require('../../middleware/userMiddleware');
const router = express.Router();
const axios = require('axios');

router.get('/noticies/articles', (req, res) => {
    const { country, category, page } = req.query;



    //const apiKey = 'pub_31474e760b76a911c5b146e6ecab83971a987';
    const apiKey = 'pub_31510e3fa57fdd9eaf76f8c8aad5b943efa97';
    //const apiKey = 'pub_31475c610f7a1d0b209777747359f076c796c';

    const url = `https://newsdata.io/api/1/news?apikey=${apiKey}&country=${country}&image=1&${category !== undefined ? 'category=' + category : ''}${page !== undefined ? 'page=' + page : ''}`;


    const response = async () => await axios.get(url)
        .then((data) => {
            res.json(data.data)
        }).catch((error) => {
            res.json(error)
        })
    response()
});



module.exports = router




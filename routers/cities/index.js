const express = require('express');
const auth = require('../../middleware/userMiddleware');
const router = express.Router();
const { citiesAutocomplete } = require('../../controllers/cities/autocomplete');
const { citiesAdvicesImgs, citiesAdvices } = require('../../controllers/cities/advices');
const { citiesWeather } = require('../../controllers/cities/weather');
const { noticies } = require('../../controllers/cities/noticies');
const { radio } = require('../../controllers/cities/radios');
const { citiesExchange } = require('../../controllers/cities/exchange');


router.get('/cities/autocomplete', citiesAutocomplete);
router.get('/cities/advices', auth, citiesAdvices);
//router.get('/cities/advices/img', auth, citiesAdvicesImgs);
router.get('/cities/weather/', auth, citiesWeather);
router.get('/cities/exchange', auth, citiesExchange);
router.get('/cities/noticies', auth, noticies);
router.get('/cities/radios/', auth, radio);



module.exports = router;




const express = require('express');
const router = express.Router();
const { regularLogin } = require('../../controllers/login/regular');
const { socialLogin } = require('../../controllers/login/social');


router.post('/login/', regularLogin);
router.post('/login/social/', socialLogin);


module.exports = router
const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/userMiddleware');
const { getFinanceResume } = require('../../../controllers/finances/resume');


router.get('/finances/resume', auth, getFinanceResume);


module.exports = router
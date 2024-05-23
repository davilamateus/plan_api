const express = require('express');
const auth = require('../../../middleware/userMiddleware');
const { addFinanceEntrace } = require('../../../controllers/finances/entraces/add');
const { getFinanceEntraces } = require('../../../controllers/finances/entraces/get');
const { editFinanceEntrace } = require('../../../controllers/finances/entraces/edit');
const { deleteFinanceEntrace } = require('../../../controllers/finances/entraces/delete');

const router = express.Router();


router.post('/finances/entraces/', auth, addFinanceEntrace)
router.get('/finances/entraces', auth, getFinanceEntraces);
router.patch('/finances/entraces/', auth, editFinanceEntrace);
router.delete('/finances/entraces/', auth, deleteFinanceEntrace);

module.exports = router;
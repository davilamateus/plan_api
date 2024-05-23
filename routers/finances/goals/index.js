const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/userMiddleware');
const { addFinanceGoals } = require('../../../controllers/finances/goals/add');
const { getFinanceGoals } = require('../../../controllers/finances/goals/get');
const { editFinanceGoals } = require('../../../controllers/finances/goals/edit');
const { deleteFinanceGoals } = require('../../../controllers/finances/goals/delete');

router.post('/finances/goals', auth, addFinanceGoals);
router.get('/finances/goals', auth, getFinanceGoals);
router.patch('/finances/goals', auth, editFinanceGoals);
router.delete('/finances/goals', auth, deleteFinanceGoals);

module.exports = router
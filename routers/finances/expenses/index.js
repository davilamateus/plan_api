const express = require('express');
const router = express.Router();
const auth = require('../../../middleware/userMiddleware/index');
const { addFinanceExpense } = require('../../../controllers/finances/expenses/add');
const { getFinanceExpenses } = require('../../../controllers/finances/expenses/get');
const { editFinanceExpense } = require('../../../controllers/finances/expenses/edit');
const { deleteFinanceExpense } = require('../../../controllers/finances/expenses/delete');

router.get('/finances/expenses', auth, getFinanceExpenses);
router.post('/finances/expenses', auth, addFinanceExpense);
router.patch('/finances/expenses', auth, editFinanceExpense);
router.delete('/finances/expenses', auth, deleteFinanceExpense);


module.exports = router
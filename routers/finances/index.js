const express = require("express");
const router = express.Router();
const { getFinance } = require("../../controllers/finances/get");
const { addFinanceEntrace } = require("../../controllers/finances/entraces/add");
const { getFinanceEntraces } = require("../../controllers/finances/entraces/get");
const { editFinanceEntrace } = require("../../controllers/finances/entraces/edit");
const { deleteFinanceEntrace } = require("../../controllers/finances/entraces/delete");
const { addFinanceGoals } = require("../../controllers/finances/goals/add");
const { editFinanceGoals } = require("../../controllers/finances/goals/edit");
const { deleteFinanceGoals } = require("../../controllers/finances/goals/delete");
const { addFinanceExpense } = require("../../controllers/finances/expenses/add");
const { editFinanceExpense } = require("../../controllers/finances/expenses/edit");
const { deleteFinanceExpense } = require("../../controllers/finances/expenses/delete");
const auth = require("../../middleware/userMiddleware");

router.get("/finances", auth, getFinance);

router.post("/finances/entraces", auth, addFinanceEntrace);
router.get("/finances/entraces", auth, getFinanceEntraces);
router.patch("/finances/entraces", auth, editFinanceEntrace);
router.delete("/finances/entraces", auth, deleteFinanceEntrace);

router.post("/finances/goals", auth, addFinanceGoals);
router.patch("/finances/goals", auth, editFinanceGoals);
router.delete("/finances/goals", auth, deleteFinanceGoals);

router.post("/finances/expenses", auth, addFinanceExpense);
router.patch("/finances/expenses", auth, editFinanceExpense);
router.delete("/finances/expenses", auth, deleteFinanceExpense);

module.exports = router;

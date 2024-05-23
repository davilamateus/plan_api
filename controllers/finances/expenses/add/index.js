const modelFinanceExpense = require('../../../../models/finances/expense');

const addFinanceExpense = (req, res) => {
    const { type, title, value, financesGoalId, date } = req.body;
    const { userId } = req.user;

    if (type && title && value && date) {
        modelFinanceExpense.create({
            type, title, value, financesGoalId, date, userId
        })
            .then(() => res.status(200).json({ result: "Add" }))
            .catch((error) => res.status(400).json(error));

    } else {
        res.status(400).json({ result: 'Fault Informations' });
    }
}

module.exports = { addFinanceExpense };
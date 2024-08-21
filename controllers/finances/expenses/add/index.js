const modelFinanceExpense = require("../../../../models/finances/expense");

const addFinanceExpense = (req, res) => {
    const { type, title, value, financesGoalId, date } = req.body;
    const { userId } = req.user;

    if (!type || !title || !value || !date) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceExpense
            .create({
                type,
                title,
                value,
                financesGoalId,
                date,
                userId
            })
            .then((data) => res.status(200).json(data));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addFinanceExpense };

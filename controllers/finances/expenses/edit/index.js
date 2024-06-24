const modelFinanceExpense = require("../../../../models/finances/expense");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const editFinanceExpense = (req, res) => {
    const { type, title, value, financesGoalId, date, id } = req.body;
    const { userId } = req.user;

    if ((!type && !title && !value && !date) || !id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceExpense
            .update(
                {
                    type,
                    title,
                    value,
                    financesGoalId,
                    date
                },
                {
                    where: { [Op.and]: [{ userId }, { id }] }
                }
            )
            .then(() => res.status(200).json({ result: "Updated" }));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editFinanceExpense };

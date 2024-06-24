const modelFinanceExpense = require("../../../../models/finances/expense");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getFinanceExpenses = (req, res) => {
    const { userId } = req.user;
    const { fromDate, toDate, type } = req.query;
    if (!type && !fromDate && !toDate) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceExpense
            .findAll({
                where: {
                    [Op.and]: [{ userId }, { type }, { date: { [Op.between]: [fromDate, toDate] } }]
                },
                order: [["date", "DESC"]]
            })
            .then((data) => res.status(200).json(data));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { getFinanceExpenses };

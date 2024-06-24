const modelFinancesEntraces = require("../../../models/finances/entraces");
const modelFinancesTripGoals = require("../../../models/finances/goals");
const modelFinancesExpenses = require("../../../models/finances/expense");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getFinanceResume = async (req, res) => {
    const { userId } = req.user;

    try {
        const getValue = async (model, where) => {
            return await model
                .findAll({
                    where: {
                        [Op.and]: [where]
                    }
                })
                .then((result) => {
                    return {
                        total: result.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0),
                        data: result
                    };
                })
                .catch(() => res.status(400).json("error"));
        };

        (async () => {
            const tripGoals = await getValue(modelFinancesTripGoals, { userId, type: 2 });
            const entraces = await getValue(modelFinancesEntraces, { userId });
            const expenses = await getValue(modelFinancesExpenses, { userId });

            const tripExpensesData = expenses.data.filter((expense) => expense.type === 2);

            const tripExpenses = tripExpensesData.reduce((accumulator, currentValue) => accumulator + currentValue.value, 0);
            const cashInHand = entraces.total - expenses.total;

            res.status(200).json({
                tripGoals: tripGoals.total,
                tripExpenses,
                cashInHand,
                missing: tripExpenses + cashInHand - tripGoals.total,
                missingPorcents: Number((((tripExpenses + cashInHand) * 100) / tripGoals.total).toFixed(2))
            });
        })();
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { getFinanceResume };

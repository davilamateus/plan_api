const modelFinanceGoals = require("../../../../models/finances/goals");
const modelFinanceExpenses = require("../../../../models/finances/expense");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getFinanceGoals = (req, res) => {
    const { userId } = req.user;
    const { type } = req.query;

    if (type) {
        let result = [];
        // getting expenses without goals
        modelFinanceExpenses
            .findAll({
                where: {
                    [Op.and]: [{ userId }, { type }, { financesGoalId: null }]
                }
            })
            .then((others) => {
                const othersTotal = others.reduce((acc, item) => acc + item.value, 0);
                result.push({ title: "Others", color: "#BCBCBC", icon: 0, value: 0, valueItens: othersTotal, id: 0, itens: others });
            });

        // getting goals

        modelFinanceGoals
            .findAll({
                where: { [Op.and]: [{ userId }, { type }] },
                include: [
                    {
                        model: modelFinanceExpenses
                    }
                ]
            })
            .then((goals) => {
                if (goals.length > 0) {
                    for (const goal of goals) {
                        const goalTotal = goal.financesExpenses.reduce((acc, expense) => acc + expense.value, 0);
                        result.push({ title: goal.title, color: goal.color, icon: goal.icon, value: goal.value, valueItens: goalTotal, id: goal.id, itens: goal.financesExpenses });
                    }
                    res.status(200).json(result);
                } else {
                    res.status(200).json(result);
                }
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    } else {
        res.status(400).json({ result: "Fault Informations" });
    }
};

module.exports = { getFinanceGoals };

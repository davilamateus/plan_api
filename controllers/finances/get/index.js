const modelFinancesEntraces = require("../../../models/finances/entraces");
const modelFinanceExpense = require("../../../models/finances/expense");
const modelFinanceGoals = require("../../../models/finances/goals");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const getFinance = async (req, res) => {
	const { userId } = req.user;

	try {
		const goals = await modelFinanceGoals.findAll({
			where: {
				userId: userId,
			},
		});
		const expenses = await modelFinanceExpense.findAll({
			where: {
				userId: userId,
			},
		});

		const others = await modelFinanceExpense.findAll({
			where: {
				userId: userId,
				financesGoalId: null,
			},
		});

		const otherDomestic = {
			id: null,
			type: 1,
			title: "Others",
			color: "#BCBCBC",
			icon: 0,
		};

		const otherTrip = {
			id: null,
			type: 2,
			title: "Others",
			color: "#BCBCBC",
			icon: 0,
		};

		const entraces = await modelFinancesEntraces.findAll({
			where: { userId: userId },
			order: [["date", "DESC"]],
		});

		res.status(200).json({
			entraces: entraces,
			domestic: {
				goals: [otherDomestic, ...goals.filter((goal) => goal.type === 1)],
				expenses: expenses.filter((expense) => expense.type === 1),
			},
			trip: {
				goals: [otherTrip, ...goals.filter((goal) => goal.type === 2)],
				expenses: expenses.filter((expense) => expense.type === 2),
			},
		});
	} catch (error) {
		console.error("Error fetching finances:", error);
		res.status(500).json({ error: "Internal server error, try again later." });
	}
};

module.exports = { getFinance };

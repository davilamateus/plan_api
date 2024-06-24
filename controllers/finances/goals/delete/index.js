const modelFinanceGoals = require("../../../../models/finances/goals");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const deleteFinanceGoals = (req, res) => {
    const { id } = req.query;
    const { userId } = req.user;
    if (!id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceGoals
            .update(
                {
                    financesGoalId: null
                },
                {
                    where: { [Op.and]: [{ userId }, { id }] }
                }
            )
            .then((data) => {
                if (data) {
                    modelFinanceGoals
                        .destroy({
                            where: { [Op.and]: [{ userId }, { id }] }
                        })
                        .then(() => res.status(200).json({ result: "Delete" }))
                        .catch((error) => res.status(400).json(error));
                } else {
                    res.status(400).json("error");
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { deleteFinanceGoals };

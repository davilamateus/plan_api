const modelFinanceExpense = require("../../../../models/finances/expense");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const deleteFinanceExpense = (req, res) => {
    const { id } = req.query;
    const { userId } = req.user;
    if (id) {
        modelFinanceExpense
            .destroy({
                where: { [Op.and]: [{ userId }, { id }] }
            })
            .then(() => res.status(200).json({ result: "Delete" }))
            .catch((error) => res.status(400).json(error));
    } else {
        res.status(400).json({ result: "Fault Informations" });
    }
};

module.exports = { deleteFinanceExpense };

const modelFinanceExpense = require('../../../../models/finances/expense');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const editFinanceExpense = (req, res) => {
    const { type, title, value, financesGoalId, date, id } = req.body;
    const { userId } = req.user;

    if ((type || title || value || date) && id) {
        modelFinanceExpense.update({
            type, title, value, financesGoalId, date,
        },
            {
                where: { [Op.and]: [{ userId }, { id }] }
            })
            .then(() => res.status(200).json({ result: "Updated" }))
            .catch((error) => res.status(400).json(error))
    }
    else {
        res.status(400).json({ result: 'Fault Informations' });
    }

}

module.exports = { editFinanceExpense };
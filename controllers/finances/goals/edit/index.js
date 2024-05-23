const modelFinanceGoal = require('../../../../models/finances/goals');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const editFinanceGoals = (req, res) => {
    const { userId } = req.user;
    const { title, icon, color, value, id } = req.body;
    if ((title || icon || color || value) && id) {
        modelFinanceGoal.update({
            title, icon, color, value
        },
            {
                where: { [Op.and]: [{ userId }, { id }] }
            })
            .then(() => { res.status(200).json({ result: "Updated" }) })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json({ result: 'Fault Informations' })
    }

}

module.exports = { editFinanceGoals };
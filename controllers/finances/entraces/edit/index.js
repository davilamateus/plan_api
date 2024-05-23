const modelFinanceEntraces = require('../../../../models/finances/entraces');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const editFinanceEntrace = (req, res) => {
    const { title, value, date, id } = req.body;
    const { userId } = req.user;

    if ((title || value || date) && id) {
        modelFinanceEntraces.update(
            {
                title, value, date
            },
            {
                where: { [Op.and]: [{ userId }, { id },] },
            })
            .then(() => res.status(200).json({ result: 'Success' }))
            .catch((error) => res.status(400).json({ result: error }))
    }
    else {
        res.status(400).json({ result: 'Fault Informations' })
    }
}

module.exports = { editFinanceEntrace };
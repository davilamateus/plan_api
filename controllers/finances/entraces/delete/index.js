const modelFinanceEntraces = require('../../../../models/finances/entraces');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const deleteFinanceEntrace = (req, res) => {
    const { id } = req.query;
    const { userId } = req.user;

    if (id) {
        modelFinanceEntraces.destroy({
            where: { [Op.and]: [{ userId }, { id },] }
        })
            .then(() => res.status(200).json({ result: 'Success' }))
            .catch((error) => res.status(400).json({ result: error }))
    }
    else {
        res.status(400).json({ result: 'Falt Informations' })
    }
}

module.exports = { deleteFinanceEntrace };
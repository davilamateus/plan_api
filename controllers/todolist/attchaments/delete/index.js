const modelToDoListAttchaments = require('../../../../models/toDoList/attchaments');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const deleteToDoListAttchaments = (req, res) => {
    const { userId } = req.user;
    const { id } = req.query;
    if (id) {
        modelToDoListAttchaments.destroy({
            where: {
                [Op.and]: [{ userId }, { id }]
            }
        })
            .then(() => res.status(200).json({ result: "Delete" }))
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json({ result: 'Fault Informations' })
    }
}

module.exports = { deleteToDoListAttchaments };
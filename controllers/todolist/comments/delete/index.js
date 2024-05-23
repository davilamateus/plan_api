const modelToDoListCommments = require('../../../../models/toDoList/comments');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const deleteToDoListComments = (req, res) => {
    const { userId } = req.user;
    const { id } = req.query;
    if (id) {
        modelToDoListCommments.destroy({
            where: {
                [Op.and]: [
                    { userId },
                    { id },
                ]
            },
        })
            .then(() => { res.status(200).json({ result: "Delete" }) })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json({ result: 'Fault Informations' })
    }
}

module.exports = { deleteToDoListComments };
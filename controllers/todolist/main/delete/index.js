const modelTodoList = require('../../../../models/toDoList/main');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const deleteToDoList = (req, res) => {
    const { id } = req.query;
    const { userId } = req.user;

    if (id) {
        modelTodoList.destroy({
            where: {
                [Op.and]: [

                    { userId },
                    { id },

                ]
            }
        })
            .then(() => res.status(200).json({ result: 'Success' }))
            .catch((error) => { res.status(400).json({ result: error }) })

    }
    else {
        res.status(400).json({ result: 'Falt Informations' })
    }
}

module.exports = { deleteToDoList };
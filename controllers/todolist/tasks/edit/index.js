const modelToDoListTasks = require('../../../../models/toDoList/tasks');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


const editToDoListTask = (req, res) => {
    const { userId } = req.user;
    const { id, status, } = req.body;

    if (id && status !== undefined) {
        modelToDoListTasks.update({
            status
        },
            {
                where: {
                    [Op.and]: [

                        { userId },
                        { id },

                    ]
                }
            })
            .then(() => res.status(200).json({ result: "Updated" }))
            .catch((error) => { res.status(400).json(error) })
    }
    else {
        res.status(400).json({ result: 'Fault Informations' });
    }
}

module.exports = { editToDoListTask };
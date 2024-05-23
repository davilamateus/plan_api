const modelToDoListTasks = require('../../../../models/toDoList/tasks');

const addToDoListTasks = (req, res) => {

    const { title, description, toDoListId } = req.body;
    const { userId } = req.user;

    if (description && title && toDoListId) {
        modelToDoListTasks.create({
            title, description, toDoListId, status: false, userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
}

module.exports = { addToDoListTasks };
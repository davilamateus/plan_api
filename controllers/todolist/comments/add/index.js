const modelToDoListCommments = require('../../../../models/toDoList/comments');

const addToDoListComments = (req, res) => {
    const { userId } = req.user;
    const { title, description, toDoListId } = req.body;
    if (description && title && toDoListId) {
        modelToDoListCommments.create({
            title, description, toDoListId, userId
        })
            .then(() => res.status(200).json({ result: "Add" }))
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json({ result: 'Fault Informations' });
    }
}

module.exports = { addToDoListComments };
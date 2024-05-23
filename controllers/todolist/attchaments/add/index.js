const modelToDoListAttchaments = require('../../../../models/toDoList/attchaments');

const addToDoListAttchaments = (req, res) => {

    const { title, link, toDoListId } = req.body;
    const { userId } = req.user;
    if (title && link && toDoListId) {
        modelToDoListAttchaments.create({
            title, link, toDoListId, userId
        })
            .then(() => { res.status(200).json({ result: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json({ result: 'Fault Informations' });
    }
}

module.exports = { addToDoListAttchaments };
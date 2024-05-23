const modelToDoList = require('./../../../../models/toDoList/main');

const addToDoList = (req, res) => {

    const { title, description, date, color } = req.body;
    const { userId } = req.user;

    if (description && title && date && color) {
        modelToDoList.create({
            title, description, date, status: 1, color, position: 0, userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
}

module.exports = { addToDoList };
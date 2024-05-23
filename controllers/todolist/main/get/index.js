const modelToDoList = require('./../../../../models/toDoList/main');
const modelToDoListTasks = require('./../../../../models/toDoList/tasks');
const modelToDoListComments = require('./../../../../models/toDoList/comments');
const modelToDoListAttchaments = require('./../../../../models/toDoList/attchaments');

const getToDoList = (req, res) => {
    const { userId } = req.user;
    modelToDoList.findAll({
        where: {
            userId
        },
        order: [['position', 'ASC'], ['createdAt', 'DESC']],
        include: [
            { model: modelToDoListTasks, order: [['createdAt', 'ASC']] },
            { model: modelToDoListComments, order: [['createdAt', 'ASC']] },
            { model: modelToDoListAttchaments, order: [['createdAt', 'ASC']] }

        ]
    })
        .then((data) => { res.status(200).json(data) })
        .catch((error) => { res.status(400).json(error) });
}

module.exports = { getToDoList };
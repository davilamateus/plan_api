const modelToDoList = require("./../../../../models/toDoList/main");

const addToDoList = (req, res) => {
    const { title, description, date, color } = req.body;
    const { userId } = req.user;

    if (!description || !title || !date || !color) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoList
            .create({
                title,
                description,
                date,
                status: 1,
                color,
                position: 0,
                userId
            })
            .then((data) => {
                res.status(200).json({
                    ...data.dataValues,
                    toDoListAttchaments: [],
                    toDoListComments: [],
                    toDoListTasks: []
                });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addToDoList };

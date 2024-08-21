const modelToDoListTasks = require("../../../../models/toDoList/tasks");

const addToDoListTasks = (req, res) => {
    const { title, description, toDoListId } = req.body;
    const { userId } = req.user;

    if (!description || !title || !toDoListId) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoListTasks
            .create({
                title,
                description,
                toDoListId,
                status: 0,
                userId
            })
            .then((data) => {
                res.status(200).json({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    toDoListId: data.toDoListId,
                    id: data.id
                });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addToDoListTasks };

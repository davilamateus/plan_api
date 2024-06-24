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
                status: false,
                userId
            })
            .then(() => {
                res.status(200).json({ sucess: "Add" });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addToDoListTasks };

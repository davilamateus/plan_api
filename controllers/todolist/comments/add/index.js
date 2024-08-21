const modelToDoListCommments = require("../../../../models/toDoList/comments");

const addToDoListComments = (req, res) => {
    const { userId } = req.user;
    const { title, description, toDoListId } = req.body;
    if (!description || !title || !toDoListId) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoListCommments
            .create({
                title,
                description,
                toDoListId,
                userId
            })
            .then((data) => res.status(200).json(data));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addToDoListComments };

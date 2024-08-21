const modelToDoListAttchaments = require("../../../../models/toDoList/attchaments");

const addToDoListAttchaments = (req, res) => {
    const { title, link, toDoListId } = req.body;
    const { userId } = req.user;
    if (!title || !link || !toDoListId) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoListAttchaments
            .create({
                title,
                link,
                toDoListId,
                userId
            })
            .then((data) => {
                res.status(200).json(data);
            })
            .catch((error) => {
                res.status(400).json(error);
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addToDoListAttchaments };

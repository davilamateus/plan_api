const modelToDoList = require("./../../../../models/toDoList/main");
const modelToDoListTasks = require("./../../../../models/toDoList/tasks");
const modelToDoListComments = require("./../../../../models/toDoList/comments");
const modelToDoListAttchaments = require("./../../../../models/toDoList/attchaments");

const getToDoList = (req, res) => {
    const { userId } = req.user;
    try {
        modelToDoList
            .findAll({
                where: {
                    userId
                },
                attributes: ["title", "description", "date", "status", "color", "position", "id"],
                order: [
                    ["position", "ASC"],
                    ["createdAt", "DESC"]
                ],
                include: [
                    {
                        model: modelToDoListTasks,
                        order: [["createdAt", "ASC"]],
                        attributes: ["title", "description", "status", "toDoListId", "id"]
                    },
                    {
                        model: modelToDoListComments,
                        attributes: ["title", "description", "date", "toDoListId", "id", "createdAt"],
                        order: [["createdAt", "ASC"]]
                    },
                    {
                        model: modelToDoListAttchaments,
                        attributes: ["title", "link", "toDoListId", "id"],
                        order: [["createdAt", "ASC"]]
                    }
                ]
            })
            .then((data) => {
                res.status(200).json(data);
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { getToDoList };

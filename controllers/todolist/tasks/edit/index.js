const modelToDoListTasks = require("../../../../models/toDoList/tasks");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const editToDoListTask = (req, res) => {
    const { userId } = req.user;
    const { id, status } = req.body;

    if (!id || status == undefined) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        console.log(id, status);
        modelToDoListTasks
            .update(
                {
                    status
                },
                {
                    where: {
                        [Op.and]: [{ userId }, { id }]
                    }
                }
            )
            .then(() => res.status(200).json({ result: "Updated" }));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editToDoListTask };

const modelTodoList = require("../../../../models/toDoList/main");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const deleteToDoList = (req, res) => {
    const { id } = req.query;
    const { userId } = req.user;

    if (!id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelTodoList
            .destroy({
                where: {
                    [Op.and]: [{ userId }, { id }]
                }
            })
            .then(() => res.status(200).json({ result: "Success" }));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { deleteToDoList };

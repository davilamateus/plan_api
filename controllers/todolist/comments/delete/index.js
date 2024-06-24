const modelToDoListCommments = require("../../../../models/toDoList/comments");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const deleteToDoListComments = (req, res) => {
    const { userId } = req.user;
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoListCommments
            .destroy({
                where: {
                    [Op.and]: [{ userId }, { id }]
                }
            })
            .then(() => {
                res.status(200).json({ result: "Delete" });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { deleteToDoListComments };

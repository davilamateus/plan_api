const modelToDoListAttchaments = require("../../../../models/toDoList/attchaments");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const deleteToDoListAttchaments = (req, res) => {
    const { userId } = req.user;
    const { id } = req.query;
    if (!id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoListAttchaments
            .destroy({
                where: {
                    [Op.and]: [{ userId }, { id }]
                }
            })
            .then(() => res.status(200).json({ result: "Delete" }));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { deleteToDoListAttchaments };

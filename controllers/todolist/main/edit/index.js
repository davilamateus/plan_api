const modelToDoList = require("./../../../../models/toDoList/main");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const editToDoList = (req, res) => {
    const { title, description, date, status, color, id, position } = req.body;
    const { userId } = req.user;

    if ((!description && !title && !status && !date && !color && !position) || !id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelToDoList
            .update(
                {
                    title,
                    description,
                    date,
                    status,
                    color,
                    position
                },
                {
                    where: {
                        [Op.and]: [{ userId }, { id }]
                    }
                }
            )
            .then(() => {
                res.status(200).json({ sucess: "Updated" });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editToDoList };

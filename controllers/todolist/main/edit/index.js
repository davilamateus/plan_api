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
                res.status(200).json({ success: "Updated" });
            });
    } catch (error) {
        console.error("Error updating todo item:", error);
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

const editToDoListPosition = async (req, res) => {
    const todolist = req.body;
    const { userId } = req.user;

    if (!todolist) {
        return res.status(400).json({ error: "Missing required parameter" });
    }

    try {
        const updatePromises = todolist.map((item) =>
            modelToDoList.update(
                {
                    status: item.status,
                    position: item.position
                },
                {
                    where: {
                        [Op.and]: [{ userId }, { id: item.id }]
                    }
                }
            )
        );

        await Promise.all(updatePromises);
        res.status(200).json({ success: "Updated" });
    } catch (error) {
        console.error("Error updating todo items:", error);
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editToDoList, editToDoListPosition };

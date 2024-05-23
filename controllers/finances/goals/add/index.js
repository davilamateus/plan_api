const modelFinanceGoals = require("../../../../models/finances/goals");

const addFinanceGoals = (req, res) => {
    const { type, title, icon, color, value } = req.body;

    const { userId } = req.user;
    if (type && title && icon && color && value) {
        modelFinanceGoals
            .create({
                type,
                title,
                icon,
                color,
                value,
                userId
            })
            .then(() => res.status(200).json({ result: "Add" }))
            .catch((error) => res.status(400).json(error));
    } else {
        res.status(400).json({ result: "Fault Informations" });
    }
};

module.exports = { addFinanceGoals };

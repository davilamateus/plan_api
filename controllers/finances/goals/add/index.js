const modelFinanceGoals = require("../../../../models/finances/goals");

const addFinanceGoals = (req, res) => {
    const { type, title, icon, color, value } = req.body;

    const { userId } = req.user;
    console.log(type, title, icon, color, value);
    if (!type || !title || !icon || !color || !value) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceGoals
            .create({
                type,
                title,
                icon,
                color,
                value,
                userId
            })
            .then((data) => res.status(200).json(data));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addFinanceGoals };

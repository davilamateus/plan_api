const modelFinanceEntraces = require("../../../../models/finances/entraces");

const addFinanceEntrace = (req, res) => {
    const { title, value, date } = req.body;
    const { userId } = req.user;

    if (!title || !value || !date) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceEntraces
            .create({
                title,
                value,
                date,
                userId
            })
            .then((data) => res.status(200).json(data));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addFinanceEntrace };

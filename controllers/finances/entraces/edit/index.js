const modelFinanceEntraces = require("../../../../models/finances/entraces");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const editFinanceEntrace = (req, res) => {
    const { title, value, date, id } = req.body;
    const { userId } = req.user;

    if ((!title && !value && !date) || !id) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceEntraces
            .update(
                {
                    title,
                    value,
                    date
                },
                {
                    where: { [Op.and]: [{ userId }, { id }] }
                }
            )
            .then(() => res.status(200).json({ result: "Success" }));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editFinanceEntrace };

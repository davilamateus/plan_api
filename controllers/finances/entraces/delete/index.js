const modelFinanceEntraces = require("../../../../models/finances/entraces");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

const deleteFinanceEntrace = (req, res) => {
    const { id } = req.query;
    const { userId } = req.user;
    if (!id || !userId) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelFinanceEntraces
            .destroy({
                where: { [Op.and]: [{ userId }, { id }] }
            })
            .then(() => res.status(200).json({ result: "Success" }));
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { deleteFinanceEntrace };

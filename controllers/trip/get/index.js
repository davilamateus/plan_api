const modelTrip = require("../../../models/trip");

const getTrip = (req, res) => {
    const { userId } = req.user;
    try {
        modelTrip
            .findOne({
                where: { userId }
            })
            .then((data) => {
                if (data) {
                    res.status(200).json(data);
                } else {
                    res.status(210).json({ result: "No Trip" });
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { getTrip };

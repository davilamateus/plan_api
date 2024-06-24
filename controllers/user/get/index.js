const modelUser = require("../../../models/users");

const getUser = (req, res) => {
    const { userId } = req.user;

    try {
        modelUser
            .findOne({
                where: {
                    id: userId
                }
            })
            .then((data) => {
                res.status(200).json({ name: data.name, email: data.email, photo: data.photo });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { getUser };

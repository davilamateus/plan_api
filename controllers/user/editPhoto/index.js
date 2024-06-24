const modelUser = require("./../../../models/users");

const editPhoto = (req, res) => {
    const { userId } = req.user;
    if (!req.file || !userId) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        const { filename } = req.file;

        modelUser
            .update(
                { photo: filename },
                {
                    where: {
                        id: userId
                    }
                }
            )
            .then(() => {
                res.status(200);
                res.json({ result: filename });
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editPhoto };

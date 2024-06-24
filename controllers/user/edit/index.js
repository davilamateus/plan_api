const modelUser = require("./../../../models/users");
const { isAValidePassword } = require("../../../functions/isAValidePassword");
const bcrypt = require("bcryptjs");

const editUser = (req, res) => {
    const { name, password } = req.body;
    const { userId } = req.user;

    if (!name.length > 3 || !isAValidePassword(password)) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelUser
            .findOne({
                where: {
                    id: userId
                }
            })
            .then((data) => {
                if (data) {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);
                    modelUser
                        .update(
                            {
                                name,
                                password: hash
                            },
                            {
                                where: {
                                    id: userId
                                }
                            }
                        )
                        .then(() => {
                            res.status(200);
                            res.json({ result: "Success" });
                        });
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { editUser };

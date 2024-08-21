const modelUser = require("./../../../models/users");
const { useCreateConfirmEmail } = require("../../../hooks/confirmEmail/useCreateConfirmEmail");
const { isEmail } = require("../../../functions/isEmail");
const { isAValidePassword } = require("../../../functions/isAValidePassword");
const firstToDoList = require("./../../../functions/firstsToDoList");
const bcrypt = require("bcryptjs");

const addNewUser = (req, res) => {
    const { name, email, password, photo = "default.png" } = req.body;

    if (!name.length > 3 || !isEmail(email) || !isAValidePassword(password)) {
        return res.status(400).json({ error: "Missing required parameter" });
    }
    try {
        modelUser
            .findOne({
                where: {
                    email: email
                }
            })
            .then((data) => {
                if (data) {
                    res.status(201).json({ result: "Used" });
                } else {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);
                    modelUser
                        .create({
                            name,
                            email,
                            status: 0,
                            type: 1,
                            password: hash,
                            photo
                        })
                        .then((data) => {
                            useCreateConfirmEmail(data.id, email);
                            firstToDoList(data.id);
                            res.status(200).json({ result: "Add" });
                        });
                }
            });
    } catch {
        res.status(500).json({ error: "Internal server error, try again later." });
    }
};

module.exports = { addNewUser };

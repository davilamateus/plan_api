const modelUser = require('../../../models/users');
const { useCreateConfirmEmail } = require('../../../hooks/confirmEmail/useCreateConfirmEmail');
const { isEmail } = require('../../../functions/isEmail');
const { isAValidePassword } = require('../../../functions/isAValidePassword');
const bcrypt = require('bcryptjs');

const addNewUser = (req, res) => {
    const { name, email, password, photo = 'default.png' } = req.body;

    if (name.length && isEmail(email) && password && isAValidePassword(password)) {
        modelUser.findOne({
            where: {
                email: email
            }
        })
            .then((data) => {
                if (data) {
                    res.status(201)
                    res.json({ result: 'Used' })
                } else {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt);
                    modelUser.create({
                        name, email, status: 0, type: 1, password: hash, photo
                    })
                        .then((data) => {
                            useCreateConfirmEmail(data.id, email);
                            res.status(200)
                            res.json({ result: 'Add' })
                        })
                        .catch((error) => {
                            res.status(400)
                            res.json({ result: error })
                        });
                }
            })
            .catch((error) => res.status(400).json({ result: error }));

    } else {
        res.status(400)
        res.json({ result: 'Fault Informations' })
    }
}

module.exports = { addNewUser };

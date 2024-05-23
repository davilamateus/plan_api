const modelUser = require('./../../../models/users');
const { isAValidePassword } = require('../../../functions/isAValidePassword');
const bcrypt = require('bcryptjs');

const editUser = (req, res) => {
    const { name, password } = req.body;
    const { userId } = req.user;

    if (name.length > 0 && isAValidePassword(password)) {
        modelUser.findOne({
            where: {
                id: userId
            }
        }).then((data) => {
            if (data) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                modelUser.update({
                    name, password: hash
                },
                    {
                        where: {
                            id: userId
                        }
                    })
                    .then(() => {
                        res.status(200)
                        res.json({ result: 'Success' })
                    })
                    .catch(error => {
                        res.status(400)
                        res.json({ result: error })
                    })
            } else {
                res.status(400)
                res.json({ result: 'Error' })
            }
        })
    } else {
        res.status(400)
        res.json({ result: 'Fault Informations' })
    }
}

module.exports = { editUser };
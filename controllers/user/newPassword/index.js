const modelChangePassword = require('../../../models/forgetPassword');
const modelUser = require('../../../models/users');
const bcrypt = require('bcryptjs');
const { isAValidePassword } = require("../../../functions/isAValidePassword");



const newPassword = (req, res) => {
    const { password } = req.body;
    const { token } = req.params;

    if (token, isAValidePassword(password)) {

        modelChangePassword.findOne({
            where: {
                token
            }
        }).then((data) => {
            if (data) {
                if (data.valid == 1) {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt)
                    modelUser.update({
                        password: hash
                    }, {
                        where: {
                            id: data.userId
                        }
                    }).then(() => {
                        modelChangePassword.update({
                            valid: false
                        },
                            {
                                where: {
                                    userId: data.userId

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

                    })
                } else {
                    res.status(201)
                    res.json({ result: 'Used' })
                }

            }
            else {
                res.status(404)
                res.json({ result: 'Error' })
            }

        })

    } else {
        res.status(400)
        res.json({ result: 'Fault Information' })
    }

}

module.exports = { newPassword };
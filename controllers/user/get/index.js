const modelUser = require('../../../models/users');


const getUser = (req, res) => {

    const { userId } = req.user;

    modelUser.findOne({
        where: {
            id: userId
        }
    })
        .then((data) => {
            if (data) {
                res.status(200).json({ name: data.name, email: data.email, photo: data.photo })
            } else {
                res.status(400).json({ result: 'error' })
            }
        })
        .catch((error) => res.status(400).json({ result: error }));


}

module.exports = { getUser };

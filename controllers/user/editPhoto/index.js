const modelUser = require('./../../../models/users')

const editPhoto = (req, res) => {


    const { userId } = req.user;
    if (req.file && userId) {
        const { filename } = req.file;

        modelUser.update(
            { photo: filename },
            {
                where: {
                    id: userId
                }
            }
        )
            .then(() => {
                res.status(200)
                res.json({ result: filename })
            })
            .catch(error => {
                res.status(400)
                res.json({ result: error })
            })

    } else {

        res.status(400)
        res.json({ result: 'Fault Informations' })
    }


}

module.exports = { editPhoto };
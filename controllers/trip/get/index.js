const modelTrip = require('../../../models/trip');

const getTrip = (req, res) => {
    const { userId } = req.user;

    modelTrip.findOne({
        where: { userId }
    })
        .then((data) => {
            if (data) {
                res.status(200).json(data)
            } else {
                res.status(210).json({ result: 'No Trip' })
            }
        })
        .catch((error) => { res.status(400).json({ result: error }) })
}


module.exports = { getTrip };
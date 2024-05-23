const modelFinanceEntraces = require('../../../../models/finances/entraces');


const addFinanceEntrace = (req, res) => {
    const { title, value, date } = req.body;
    const { userId } = req.user;

    console.log(title,value,date)
    if (title && value && date) {
        modelFinanceEntraces.create({
            title, value, date, userId
        })
            .then(() => res.status(200).json({ result: 'Success' }))
            .catch((error) => res.status(400).json({ result: error }))

    } else {
        res.status(400).json({ result: 'Falt Informations' });
    }
}

module.exports = { addFinanceEntrace };
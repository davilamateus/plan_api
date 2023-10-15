const express = require('express');
const router = express.Router();
const financesEntraces = require('../../../models/finances/entraces');
const auth = require('../../../../front/middleware/userMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.post('/finances/entraces/', auth, (req, res) => {
    const { title, value, date } = req.body;
    if (title && value && date) {
        financesEntraces.create({
            title, value, date, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});


router.get('/finances/entraces', auth, (req, res) => {
    const userId = req.user.userId;
    const { fromDate, toDate } = req.query;
    if (userId !== null) {
        financesEntraces.findAll({
            where: {
                [Op.and]: [

                    { userId: userId },
                    {
                        date: {
                            [Op.between]: [fromDate, toDate]
                        }
                    },
                ]
            },
            order: [['date', 'DESC']],

        })
            .then((data) => {
                res.status(200).json(data)
                console.log(data)

            })
            .catch((error) => { res.status(400).json(error) });

    }
    else {
        res.status(300).json('No Auth');
    }
});






router.patch('/finances/entraces/', auth, (req, res) => {
    const { title, value, date, id } = req.body;
    if (title && value && date && id) {

        financesEntraces.update({
            title, value, date
        },
            {
                where: {
                    [Op.and]: [

                        { userId: req.user.userId },
                        { id: id },

                    ]
                },
            })
            .then(() => { res.status(200).json({ sucess: "Updated" }) })
            .catch((error) => { res.status(400).json(error) })
    }
    else {
        res.status(400).json({ error: 'Fault Informations' });
    }
});

router.delete('/finances/entraces/', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        financesEntraces.destroy({
            where: {
                [Op.and]: [

                    { userId: req.user.userId },
                    { id: id },

                ]
            }
        })
            .then(() => { res.status(200).json({ sucess: "Delete" }) })
            .catch((error) => { res.status(400).json(error) })
    } else {
        res.status(400).json('error');

    }
});

module.exports = router
const express = require('express');
const router = express.Router();
const financesExpense = require('../../../models/finances/expense');
const auth = require('../../../Middleware/userMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post('/finances/expense/', auth, (req, res) => {
    const { type, title, value, financesGoalId, recurrent, date } = req.body;
    if (type && title && value && recurrent !== null && date) {
        financesExpense.create({
            type, title, value, financesGoalId, recurrent, date, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});


router.get('/finances/expense', auth, (req, res) => {
    const userId = req.user.userId;
    const { fromDate, toDate, type } = req.query;

    if (userId !== null) {
        financesExpense.findAll({
            where: {
                [Op.and]: [

                    { userId: userId },
                    { type: type },
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

            })
            .catch((error) => { res.status(400).json(error) });

    }
    else {
        res.status(300).json('No Auth');
    }
});



router.patch('/finances/expense/', auth, (req, res) => {
    const { type, title, value, financesGoalId, date, id } = req.body;
    if (type && title && value && date && id) {
        financesExpense.update({
            type, title, value, financesGoalId, date,
        },
            {
                where: {
                    [Op.and]: [

                        { userId: req.user.userId },
                        { id: id },

                    ]
                }
            })
            .then(() => { res.status(200).json({ sucess: "Updated" }) })
            .catch((error) => { res.status(400).json(error) })
    }
    else {
        res.status(400).json({ error: 'Fault Informations' });
    }
});

router.delete('/finances/expense/', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        financesExpense.findOne({
            where: {
                [Op.and]: [

                    { userId: req.user.userId },
                    { id: id },

                ]
            },
        }).then((data) => {
            if (data) {
                financesExpense.destroy({
                    where: {
                        id: id,
                    }
                })
                    .then(() => { res.status(200).json({ sucess: "Delete" }) })
                    .catch((error) => { res.status(400).json(error) })
            } else {
                res.status(400).json('error');
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});

module.exports = router
const express = require('express');
const router = express.Router();
const financesExpense = require('../../../models/finances/expense');
const financesEntraces = require('../../../models/finances/entraces');
const auth = require('../../../middleware/userMiddleware');
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

router.get('/finances/cashinhand', auth, (req, res) => {
    const userId = req.user.userId;

    if (userId !== null) {
        let totalExpense = 0;
        let totalEntrace = 0;
        financesExpense.findAll({
            where: {
                [Op.and]: [
                    { userId: userId },
                ]
            },
        })
            .then((expenses) => {
                if (expenses.length > 0) {
                    expenses.map((expense) => {
                        totalExpense = totalExpense + expense.value;
                    });
                }

                financesEntraces.findAll({
                    where: {
                        [Op.and]: [
                            { userId: userId },
                        ]
                    },
                }).then((entraces) => {
                    if (entraces.length > 0) {
                        entraces.map((entrace) => {
                            totalEntrace = totalEntrace + entrace.value;
                        })
                    }
                    res.status(200).json(totalEntrace - totalExpense)
                })

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
const express = require('express');
const router = express.Router();
const financesGoals = require('../../../models/finances/goals');
const financesExpense = require('../../../models/finances/expense');
const auth = require('../../../Middleware/userMiddleware');
const Sequelize = require('sequelize');
const TotalEntraces = require('./functions/totalEntraces');
const TotalCosts = require('./functions/totalCost');
const Op = Sequelize.Op;

/*
router.get('/finances/', auth, (req, res) => {
    const userId = req.user.userId;



    if (userId !== null) {
        financesExpense.findAll({
            where: {
                userId: userId,
            },
            include: [{ model: financesGoals }],

        })
            .then((data) => {
                res.json({
                    totalEntraces: [
                        TotalValue(0, data, 1),
                        TotalValue(-1, data, 1),
                        TotalValue(-2, data, 1),
                        TotalValue(-3, data, 1),
                        TotalValue(-4, data, 1),
                        TotalValue(-5, data, 1),
                        TotalValue(-6, data, 1),
                        TotalValue(-7, data, 1),
                    ],
                    totalDomesticCost: [
                        TotalValue(0, data, 2),
                        TotalValue(-1, data, 2),
                        TotalValue(-2, data, 2),
                        TotalValue(-3, data, 2),
                        TotalValue(-4, data, 2),
                        TotalValue(-5, data, 2),
                        TotalValue(-6, data, 2),
                        TotalValue(-7, data, 2),
                    ],
                    totalProf:
                        [
                            {
                                month: TotalValue(0, data, 1).month,
                                value: TotalValue(0, data, 1).value - TotalValue(0, data, 2).value
                            },
                            {
                                month: TotalValue(-1, data, 1).month,
                                value: TotalValue(-1, data, 1).value - TotalValue(-1, data, 2).value
                            },
                            {
                                month: TotalValue(-2, data, 1).month,
                                value: TotalValue(-2, data, 1).value - TotalValue(-2, data, 2).value
                            },
                            {
                                month: TotalValue(-3, data, 1).month,
                                value: TotalValue(-3, data, 1).value - TotalValue(-3, data, 2).value
                            },
                            {
                                month: TotalValue(-4, data, 1).month,
                                value: TotalValue(-4, data, 1).value - TotalValue(-4, data, 2).value
                            },
                            {
                                month: TotalValue(-5, data, 1).month,
                                value: TotalValue(-5, data, 1).value - TotalValue(-5, data, 2).value
                            },
                            {
                                month: TotalValue(-6, data, 1).month,
                                value: TotalValue(-6, data, 1).value - TotalValue(-6, data, 2).value
                            },
                            {
                                month: TotalValue(-7, data, 1).month,
                                value: TotalValue(-7, data, 1).value - TotalValue(-5, data, 2).value
                            }


                        ]
                })




            })
            .catch((error) => { res.status(400).json(error) });

    }
    else {
        res.status(300).json('No Auth');
    }
});

*/

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

                //res.status(200).json(TotalEntraces(data))


            })
            .catch((error) => { res.status(400).json(error) });

    }
    else {
        res.status(300).json('No Auth');
    }
});


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


router.get('/finances/costs', auth, (req, res) => {
    const userId = req.user.userId;
    const { fromDate, toDate, type } = req.query;

    if (userId !== null) {

        financesGoals.findAll({
            where: {
                [Op.and]: [
                    { userId: userId }, { type: type }
                ]
            },
            include: [{ model: financesExpense }],
        }).then((goals) => {
            res.status(200).json(
                TotalCosts(goals, type)
                //goals
            )

        })

            .catch((error) => { res.status(400).json(error) });

    }
    else {
        res.status(300).json('No Auth');
    }
});



router.patch('/finances/expense/', auth, (req, res) => {
    const { type, title, value, financesHomeCategoryId, recurrent, date, id } = req.body;
    if (type && title && value && date && id) {
        financesExpense.findOne({
            where: {
                id: id,
                [Op.and]: [
                    {
                        userId: req.user.userId
                    }
                ]
            },
        }).then((data) => {
            if (data) {
                financesExpense.update({
                    type, title, value, financesGoals, recurrent, date,
                },
                    {
                        where: {
                            id: id,
                        }
                    })
                    .then(() => { res.status(200).json({ sucess: "Updated" }) })
                    .catch((error) => { res.status(400).json(error) })
            } else {
                res.status(400).json('error');
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' });
    }
});

router.delete('/finances/expense/', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        financesExpense.findOne({
            where: {
                id: id,
                [Op.and]: [
                    {
                        userId: req.user.userId
                    }
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
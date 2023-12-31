const express = require('express');
const router = express.Router();
const financesGoals = require('../../../models/finances/goals');
const auth = require('../../../middleware/userMiddleware');
const Sequelize = require('sequelize');
const financesExpense = require('../../../models/finances/expense');
const Op = Sequelize.Op;



router.post('/finances/goals', auth, (req, res) => {
    const { type, title, icon, color, value } = req.body;
    if (type && title && icon && color && value) {
        financesGoals.create({
            type, title, icon, color, value, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json('Fault Informations');

    }
});

router.get('/finances/goals', auth, (req, res) => {
    const userId = req.user.userId;
    const { fromDate, toDate, type } = req.query;
    if (fromDate && toDate && type && userId) {
        if (userId !== null) {

            let result = [];

            financesExpense.findAll({
                where: {
                    [Op.and]: [

                        { userId: userId },
                        { type: type },
                        { financesGoalId: null },
                        {
                            date: {
                                [Op.between]: [fromDate, toDate]
                            }
                        },
                    ]
                }
            })
                .then((others) => {
                    let calc = 0

                    others.map((item) => {
                        calc = calc + item.value
                    })
                    result.push({
                        title: 'Others',
                        color: '#BCBCBC',
                        icon: 0,
                        value: 0,
                        valueItens: calc,
                        id: 0,
                        itens: others
                    })

                })
            financesGoals.findAll({
                where: {
                    [Op.and]: [
                        {
                            userId: userId,
                        },
                        { type: type }
                    ]
                },
                include: [{
                    model: financesExpense,
                }],

            })
                .then((goals) => {

                    goals.map((goal) => {

                        let calc = 0;

                        goal.financesExpenses.map((expense) => {
                            if (type == 1) {
                                if (expense.date >= fromDate && expense.date <= toDate) {
                                    calc = calc + expense.value
                                }
                            } else {
                                calc = calc + expense.value
                            }
                        })
                        let financesItens = []
                        goal.financesExpenses.map((expense) => {
                            if (type == 1) {
                                if (expense.date >= fromDate && expense.date <= toDate) {
                                    financesItens.push(expense);
                                }
                            } else {
                                financesItens.push(expense);
                            }
                        })
                        result.push({
                            type: goal.type,
                            title: goal.title,
                            color: goal.color,
                            icon: goal.icon,
                            value: goal.value,
                            valueItens: calc,
                            id: goal.id,
                            itens: financesItens
                        })

                    })


                })
                .then(() => {
                    res.status(200).json(result);

                })
                .catch((error) => { res.status(400).json(error) })

        }
    }
    else {
        res.status(300).json('Fault Informations.');
    }
});

router.patch('/finances/goals', auth, (req, res) => {
    const { title, icon, color, id, value } = req.body;
    if (title && icon && color && id && value) {
        financesGoals.update({
            title, icon, color, value
        },
            {
                where: {
                    id: id,
                }
            })
            .then(() => { res.status(200).json({ sucess: "Updated" }) })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});


router.delete('/finances/goals', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        financesGoals.findOne({
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
                financesGoals.destroy({
                    where: {
                        id: id,
                    }
                })
                    .then(() => { res.status(200).json({ sucess: "Delete" }) })
                    .catch((error) => { res.status(400).json(error) })
            } else {
                res.status(400).json('error')
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});

module.exports = router
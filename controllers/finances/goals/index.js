const express = require('express');
const router = express.Router();
const financesGoals = require('../../../models/finances/goals');
const auth = require('../../../Middleware/userMiddleware');
const Sequelize = require('sequelize');
const financesExpense = require('../../../models/finances/expense');
const Op = Sequelize.Op;



router.post('/finances/goals', auth, (req, res) => {
    const { type, title, icon, color, value } = req.body;
    console.log(type, title, icon, color, value, req.user.userId)
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
    if (userId !== null) {
        financesGoals.findAll({
            where: {
                [Op.or]: [
                    {
                        userId: userId,
                    }, {
                        userId: 0
                    },
                ]
            },
            include: [{ model: financesExpense }],

        })
            .then((data) => {
                res.status(200).json(data.map((item) => {
                    return {
                        type: item.type,
                        title: item.title,
                        color: item.color,
                        icon: item.icon,
                        value: item.value,
                        id: item.id,
                        itens: item.financesExpenses
                    }
                }))
            })
            .catch((error) => { res.status(400).json(error) })

    }
    else {
        res.status(300).json('No Auth');
    }
});

router.patch('/finances/goals', auth, (req, res) => {
    const { type, title, icon, color } = req.body;
    if (type && title && icon && color) {
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
                financesGoals.update({
                    title, icon, color,
                },
                    {
                        where: {
                            id: id,
                        }
                    })
                    .then(() => { res.status(200).json({ sucess: "Updated" }) })
                    .catch((error) => { res.status(400).json(error) })
            } else {
                res.status(400).json('error')
            }
        })
    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});

router.delete('/finances/goals', auth, (req, res) => {
    const { id } = req.body;
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
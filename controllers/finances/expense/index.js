const express = require('express');
const router = express.Router();
const financesCategories = require('./../../../models/finances/categories');
const financesExpense = require('./../../../models/finances/expense');
const auth = require('./../../../Middleware/userMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.post('/finances/expense/', auth, (req, res) => {
    const { type, title, value, financesHomeCategoryId, recurrent, date } = req.body;
    if (type && title && value && financesHomeCategoryId && recurrent !== null && date) {
        financesExpense.create({
            type, title, value, financesHomeCategoryId, recurrent, date, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});

router.get('/finances/expense/', auth, (req, res) => {
    const userId = req.user.userId;
    if (userId !== null) {
        financesExpense.findAll({
            where: {
                userId: userId,
            },
            include: [{ model: financesHomeCategories }],

        })
            .then((data) => {
                res.status(200).json(data.map((item) => {
                    return {
                        id: item.id,
                        type: item.type,
                        title: item.title,
                        value: item.value,
                        financesHomeCategory: item.financesHomeCategory,
                        recurrent: item.recurrent,
                        date: item.date
                    }
                }))
            })
            .catch((error) => { res.status(400).json(error) });

    }
    else {
        res.status(300).json('No Auth');
    }
});

router.patch('/finances/expense/', auth, (req, res) => {
    const { type, title, value, financesHomeCategoryId, recurrent, date, id } = req.body;
    if (type && title && value && financesHomeCategoryId && recurrent !== null && date && id) {
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
                    type, title, value, financesHomeCategoryId, recurrent, date,
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
    const { id } = req.body;
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
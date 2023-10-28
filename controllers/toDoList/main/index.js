const express = require('express');
const router = express();
const toDoListModel = require('./../../../models/toDoList/main');
const toDoListTasks = require('./../../../models/toDoList/tasks');
const toDoListComments = require('./../../../models/toDoList/comments');
const toDoListAttchaments = require('./../../../models/toDoList/attchaments');
const auth = require('../../../middleware/userMiddleware/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post('/todolist', auth, (req, res) => {
    const { title, description, date, status, icon, color, position } = req.body;
    console.log(title, description, date, status, icon, color, position)
    if (description && title && status && icon && date && color && position) {
        toDoListModel.create({
            title, description, date, status, icon, color, position, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});


router.get('/todolist', auth, (req, res) => {
    const userId = req.user.userId;

    if (userId !== null) {
        toDoListModel.findAll({
            where: {
                userId: userId
            },
            order: [['position', 'DESC'], ['createdAt', 'DESC']],
            include: [
                { model: toDoListTasks, },
                { model: toDoListComments, },
                { model: toDoListAttchaments, },

            ]
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



router.patch('/todolist', auth, (req, res) => {
    const { title, description, date, status, icon, color, position, id } = req.body;
    if (description && title && status && icon && date && color && position && id) {
        toDoListModel.update({
            title, description, date, status, icon, color, position,
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


/*
router.delete('/todolist/', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        toDoListModel.findOne({
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

*/

module.exports = router
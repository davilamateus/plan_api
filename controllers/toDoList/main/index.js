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
    const { title, description, date, color } = req.body;
    if (description && title && date && color) {
        toDoListModel.create({
            title, description, date, status: 1, color, position: 0, userId: req.user.userId
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
            order: [['position', 'ASC'], ['createdAt', 'DESC']],
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
    const { title, description, date, status, color, position, id } = req.body;
    if (description && title && status && date && color && position && id) {
        toDoListModel.update({
            title, description, date, status, color, position,
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

router.patch('/todolist/position', auth, (req, res) => {
    const { todolistList } = req.body;
    if (todolistList) {
        if (todolistList.length > 0) {
            todolistList.map((todolist) => {
                console.log(todolist.status)
                toDoListModel.update({
                    status: todolist.status,
                    position: todolist.position
                },
                    {
                        where: {
                            [Op.and]: [

                                { userId: req.user.userId },
                                { id: todolist.id },

                            ]
                        }
                    })
            })
        }
        res.status(200).json('Updade')
    }

});



module.exports = router
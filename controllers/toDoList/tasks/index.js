const express = require('express');
const router = express();
const toDoListTask = require('../../../models/toDoList/tasks');
const auth = require('../../../middleware/userMiddleware/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post('/todolist/task', auth, (req, res) => {
    const { title, description, toDoListId } = req.body;

    if (description && title && toDoListId) {
        toDoListTask.create({
            title, description, toDoListId, status: false, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});



router.patch('/todolist/task', auth, (req, res) => {
    const { id, status, } = req.body;
    if (id && status !== undefined) {
        toDoListTask.update({
            status
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



router.delete('/todolist/task', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        console.log('******', id)
        toDoListTask.destroy({
            where: {
                [Op.and]: [

                    { userId: req.user.userId },
                    { id: id },

                ]
            },
        }).then(() => {
            res.status(200).json({ sucess: "Delete" })
        })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json({ error: 'Fault Informations' })
    }
});



module.exports = router
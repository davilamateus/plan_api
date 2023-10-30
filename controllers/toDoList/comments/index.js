const express = require('express');
const router = express();
const toDoListComments = require('../../../models/toDoList/comments');
const auth = require('../../../middleware/userMiddleware/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


router.post('/todolist/comment', auth, (req, res) => {
    const { title, description, toDoListId } = req.body;
    if (description && title && toDoListId) {
        toDoListComments.create({
            title, description, toDoListId, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});









router.delete('/todolist/comment', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        toDoListComments.destroy({
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
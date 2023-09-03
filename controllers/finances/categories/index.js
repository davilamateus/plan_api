const express = require('express');
const router = express.Router();
const financesCategories = require('../../../models/finances/categories');
const auth = require('../../../Middleware/userMiddleware');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;



router.post('/finances/categories/', auth, (req, res) => {
    const { type, title, icon, color } = req.body;
    if (type && title && icon && color) {
        financesCategories.create({
            type, title, icon, color, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) })

    } else {
        res.status(400).json('Fault Informations');

    }
});

router.get('/finances/categories/', auth, (req, res) => {
    const userId = req.user.userId;
    if (userId !== null) {
        financesCategories.findAll({
            where: {
                [Op.or]: [
                    {
                        userId: userId,
                    }, {
                        userId: 0
                    },
                ]
            }
        })
            .then((data) => {
                res.status(200).json(data.map((item) => {
                    return {
                        type: item.type,
                        title: item.title,
                        color: item.color,
                        icon: item.icon,
                        id: item.id
                    }
                }))
            })
            .catch((error) => { res.status(400).json(error) })

    }
    else {
        res.status(300).json('No Auth');
    }
});

router.patch('/finances/categories/', auth, (req, res) => {
    const { type, title, icon, color } = req.body;
    if (type && title && icon && color) {
        financesCategories.findOne({
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
                financesCategories.update({
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

router.delete('/finances/categories/', auth, (req, res) => {
    const { id } = req.body;
    if (id) {
        financesCategories.findOne({
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
                financesCategories.destroy({
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
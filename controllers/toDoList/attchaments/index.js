const express = require('express');
const router = express();
const toDoListAttchaments = require('../../../models/toDoList/attchaments');
const auth = require('../../../middleware/userMiddleware/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');


router.post('/todolist/attchament', auth, (req, res) => {

    const { title, link, toDoListId } = req.body;
    if (title && link && toDoListId) {
        toDoListAttchaments.create({
            title, link, toDoListId, userId: req.user.userId
        })
            .then(() => { res.status(200).json({ sucess: "Add" }) })
            .catch((error) => { res.status(400).json(error) });

    } else {
        res.status(400).json('Fault Informations');

    }
});


const storage = multer.diskStorage({
    destination: path.resolve('uploads/todolist/attchaments'),
    filename: (req, file, cb) => {
        crypto.randomBytes(16, (err, buf) => {
            if (err) return cb(err);

            const fileExtension = path.extname(file.originalname);
            const newFileName = buf.toString('hex') + fileExtension;
            cb(null, newFileName);
        });
    },
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 8 * 1024 * 1024 }, // 8 megabytes
    fileFilter: (req, file, cb) => {
        const allowedFileExtensions = ['.doc', '.pdf', '.jpeg', '.jpg', '.png', '.xlsx'];
        const fileExtension = path.extname(file.originalname).toLowerCase();

        if (allowedFileExtensions.includes(fileExtension)) {
            cb(null, true);
        } else {
            cb(new Error('Only DOC, PDF, JPEG, PNG, JPG and Excel'));
        }
    },
});


router.post('/todolist/attchament/upload', upload.single('file'), auth, (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'Nenhum arquivo foi enviado.' });
    }
    const fileName = req.file.filename;
    res.json({ fileName });
});

router.delete('/todolist/attchament', auth, (req, res) => {
    const { id } = req.query;
    if (id) {
        toDoListAttchaments.destroy({
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
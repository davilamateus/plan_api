const express = require('express');
const router = express();
const auth = require('../../../middleware/userMiddleware/index');
const { addToDoListAttchaments } = require('../../../controllers/todolist/attchaments/add');
const { uploadAttchaments, uploadAttchamentsFile } = require('../../../controllers/todolist/attchaments/upload');
const { deleteToDoListAttchaments } = require('../../../controllers/todolist/attchaments/delete');


router.post('/todolist/attchaments', auth, addToDoListAttchaments);
router.post('/todolist/attchaments/upload', auth, uploadAttchamentsFile.single('file'), uploadAttchaments);
router.delete('/todolist/attchaments', auth, deleteToDoListAttchaments);



module.exports = router;
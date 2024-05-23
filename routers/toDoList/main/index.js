const express = require('express');
const router = express();
const auth = require('../../../middleware/userMiddleware/index');
const { addToDoList } = require('../../../controllers/todolist/main/add');
const { getToDoList } = require('../../../controllers/todolist/main/get');
const { editToDoList } = require('../../../controllers/todolist/main/edit');
const { deleteToDoList } = require('../../../controllers/todolist/main/delete');

router.post('/todolist', auth, addToDoList);
router.get('/todolist', auth, getToDoList);
router.patch('/todolist', auth, editToDoList);
router.delete('/todolist', auth, deleteToDoList);

module.exports = router
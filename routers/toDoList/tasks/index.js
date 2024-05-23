const express = require('express');
const router = express();
const auth = require('../../../middleware/userMiddleware/index');
const { addToDoListTasks } = require('../../../controllers/todolist/tasks/add');
const { editToDoListTask } = require('../../../controllers/todolist/tasks/edit');
const { deleteToDoListTask } = require('../../../controllers/todolist/tasks/delete');


router.post('/todolist/tasks', auth, addToDoListTasks);
router.patch('/todolist/tasks', auth, editToDoListTask);
router.delete('/todolist/tasks', auth, deleteToDoListTask);



module.exports = router
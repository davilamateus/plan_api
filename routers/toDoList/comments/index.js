const express = require('express');
const router = express();
const auth = require('../../../middleware/userMiddleware/index');
const { addToDoListComments } = require('../../../controllers/todolist/comments/add');
const { deleteToDoListComments } = require('../../../controllers/todolist/comments/delete');


router.post('/todolist/comments', auth, addToDoListComments);
router.delete('/todolist/comments', auth, deleteToDoListComments);

module.exports = router;
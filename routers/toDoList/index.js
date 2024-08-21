const express = require("express");
const router = express();
const auth = require("../../middleware/userMiddleware/index");
const { addToDoList } = require("../../controllers/todolist/main/add");
const { getToDoList } = require("../../controllers/todolist/main/get");
const { editToDoList, editToDoListPosition } = require("../../controllers/todolist/main/edit");
const { deleteToDoList } = require("../../controllers/todolist/main/delete");
const { addToDoListAttchaments } = require("../../controllers/todolist/attchaments/add");
const { uploadAttchaments, uploadAttchamentsFile } = require("../../controllers/todolist/attchaments/upload");
const { deleteToDoListAttchaments } = require("../../controllers/todolist/attchaments/delete");
const { addToDoListTasks } = require("../../controllers/todolist/tasks/add");
const { editToDoListTask } = require("../../controllers/todolist/tasks/edit");
const { deleteToDoListTask } = require("../../controllers/todolist/tasks/delete");
const { addToDoListComments } = require("../../controllers/todolist/comments/add");
const { deleteToDoListComments } = require("../../controllers/todolist/comments/delete");

router.post("/todolist", auth, addToDoList);
router.get("/todolist", auth, getToDoList);
router.patch("/todolist", auth, editToDoList);
router.patch("/todolist/position", auth, editToDoListPosition);
router.delete("/todolist", auth, deleteToDoList);

router.post("/todolist/tasks", auth, addToDoListTasks);
router.patch("/todolist/tasks", auth, editToDoListTask);
router.delete("/todolist/tasks", auth, deleteToDoListTask);

router.post("/todolist/attchaments", auth, addToDoListAttchaments);
router.post("/todolist/attchaments/upload", auth, uploadAttchamentsFile.single("file"), uploadAttchaments);
router.delete("/todolist/attchaments", auth, deleteToDoListAttchaments);

router.post("/todolist/comments", auth, addToDoListComments);
router.delete("/todolist/comments", auth, deleteToDoListComments);

module.exports = router;

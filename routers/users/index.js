const express = require("express");
const router = express.Router();
const auth = require("../../middleware/userMiddleware");
const { getUser } = require("../../controllers/user/get");
const { addNewUser } = require("../../controllers/user/add");
const { editUser } = require("../../controllers/user/edit");
const { confirmEmail } = require("../../controllers/user/confirmEmail");
const {
	forgetPasswordCode,
} = require("../../controllers/user/forgetPasswordGeneration");
const {
	newPassword,
	checkedCode,
} = require("../../controllers/user/newPassword");
const { editPhoto } = require("../../controllers/user/editPhoto");
const upload = require("../../hooks/uploadPhoto");

router.get("/user/", auth, getUser);
router.post("/user/", addNewUser);
router.patch("/user/", auth, editUser);
router.post("/user/photo", auth, upload.single("file"), editPhoto);
router.patch("/confirmemail/:token", confirmEmail);
router.post("/forgetpassword/", forgetPasswordCode);
router.get("/newpassword/:token", checkedCode);
router.patch("/newpassword", newPassword);

module.exports = router;

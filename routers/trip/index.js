const express = require("express");
const router = express.Router();
const auth = require("../../middleware/userMiddleware");
const { addTrip } = require("../../controllers/trip/add");
const { getTrip } = require("../../controllers/trip/get");
const { editTrip } = require("../../controllers/trip/edit");

router.get("/trip/", auth, getTrip);
router.post("/trip/", auth, addTrip);
router.patch("/trip/", auth, editTrip);

module.exports = router;

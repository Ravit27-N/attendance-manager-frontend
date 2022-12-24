const express = require("express");
const AttendaceController = require("../controller/attendanceController");
const router = express.Router();
const auth = require("../config/auth");


router.route("/")
  .get(AttendaceController.getAllstudent)
  .post(AttendaceController.registerattandacnce);
router.route("/lastfive")
  .get(AttendaceController.getLastFiveAttendances)


module.exports = router;

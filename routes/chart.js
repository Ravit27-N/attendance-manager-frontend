const express = require("express");
const chartcontroller = require("../controller/chartcontroller");
const router = express.Router();
const auth = require("../config/auth");



router.route("/today").get(chartcontroller.getdatatoday)
router.route("/department").post(chartcontroller.getAttendanceEachDepartment)
router.route("/daily").post(chartcontroller.getAttendanceTotalDaily)
router.route("/monthly").post(chartcontroller.getAttendanceTotalMonthly)

module.exports = router;

const express = require("express");
const chartcontroller = require("../controller/chartcontroller");
const router = express.Router();
const auth = require("../config/auth");



router.route("/today").get(chartcontroller.getdatetoday)


module.exports = router;

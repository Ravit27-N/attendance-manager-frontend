const express = require("express");
const reportcontroller = require("../controller/reportController");
const router = express.Router();
const auth = require("../config/auth");



router.route("/").post(reportcontroller.getdatabystartdateandenddate)


module.exports = router;

const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();

// @route GET && POST - /posts/
router
  .route("/")
  .get(studentController.getAllstudent)
  .post(studentController.createNewStudent);

router.route("/:id").get(studentController.getStudentById);

module.exports = router;

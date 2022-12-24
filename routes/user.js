const express = require('express')
const userController = require("../controller/userController");
const router = express.Router();
const auth = require("../config/auth");

router.route("/").get(auth,userController.getAlluser)
router.route("/register").post(userController.regitster);
router.route("/login").post(userController.login);
// router.route("/:id")
//       .get(studentController.getStudentById)
//       .put(upload.single("image"),studentController.UpdateStudent);

module.exports = router;


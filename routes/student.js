const express = require("express");
const studentController = require("../controller/studentController");
const router = express.Router();
const auth = require("../config/auth");

const multer  = require('multer');
var storage = multer.diskStorage({   
  destination: function(req, file, cb) { 
     cb(null, './uploads');    
  }, 
  filename: function (req, file, cb) { 
     cb(null , Date.now()+file.originalname);   
  }
});

const upload = multer({
  storage: storage,
  limits : {fileSize : 1000000}
});

router
  .route("/")
  .get(studentController.getAllstudent)
  .post(upload.single("image"),studentController.createNewStudent);
router.route("/test").post(upload.single("image"),studentController.test);
router.route("/:id")
      .get(studentController.getStudentById)
      .delete(studentController.deleteStudentById)
      .put(upload.single("image"),studentController.UpdateStudent);

module.exports = router;

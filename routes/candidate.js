const express = require("express");
const candidateController = require("../controller/candidateController");
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
  .get(candidateController.getAllstudent)
  .post(upload.single("image"),candidateController.createNewStudent);
router.route("/test").post(upload.single("image"),candidateController.test);
router.route("/:id")
      .get(candidateController.getStudentById)
      .delete(candidateController.deleteStudentById)
      .put(upload.single("image"),candidateController.UpdateStudent);
router.route("/studentid").post(candidateController.getStudentByStudentId)

module.exports = router;

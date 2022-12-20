const Student = require("../models/student");

exports.getAllstudent = async (req, res, next) => {
  try {
    const [student, _] = await Student.findAll();

    res.status(200).json({ count: student.length, student });
  } catch (error) {
    next(error);
  }
};

exports.createNewStudent = async (req, res, next) => {
  try {
    let { student_id,name, gender,dob,province,year_department,department,option } = req.body;
    
    this.imageurl=imageurl;

    let student = new Student(student_id,name,gender,dob,province,year_department,department,option);
    student = await student.save();

    res.status(201).json({ message: "Post created" });
  } catch (error) {
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    let studentId = req.params.id;

    let [student, _] = await Student.findById(studentId);

    res.status(200).json({ student: student[0] });
  } catch (error) {
    next(error);
  }
};
exports.test = async (req, res, next) => {
  try {

    if(req.file){
      var baseUrl = "http://localhost:3001/uploads/"+req.file.filename;
    }else{
      var baseUrl = "";
    }
    console.log(req.file.filename);

  } catch (error) {
    next(error);
  }
};

const Candidate = require("../models/Candidate");

exports.getAllstudent = async (req, res, next) => {
  try {
    const [candidates, _] = await Candidate.findAll();
    res.status(200).json({ count: candidates.length, candidates });
  } catch (error) {
    next(error);
  }
};

exports.createNewStudent = async (req, res, next) => {
  try {
    let { student_id, name, gender,phone_number, dob, usertype, year_department, department, option } = req.body;

    // console.log(req.body);

    if (req.file) {
      var baseUrl = "http://localhost:3000/uploads/" + req.file.filename;
    } else {
      var baseUrl = "";
    }
    var imageurl = baseUrl;
    let student = new Candidate(student_id, name, gender,phone_number, dob, usertype, year_department, department, option, imageurl);

    student = await student.save();
    res.status(201).json({ message: "Student created" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.UpdateStudent = async (req, res, next) => {
  try {
    let { student_id, name, gender,phone_number, dob, usertype, year_department, department, option } = req.body;
    var id = req.params.id;
  
    if (req.file) {
      var baseUrl = "http://localhost:3000/uploads/" + req.file.filename;
    } else {
      var baseUrl = "";
    }
    var imageurl = baseUrl;
    let student = new Candidate(student_id, name, gender,phone_number, dob, usertype, year_department, department, option, imageurl);

    student = await student.edit(id);
    res.status(201).json({ message: "Candidate modified" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getStudentById = async (req, res, next) => {
  try {
    let studentId = req.params.id;

    let [student, _] = await Candidate.findById(studentId);

    res.status(200).json({ student: student[0] });
  } catch (error) {
    next(error);
  }
};
exports.getStudentByStudentId = async (req, res, next) => {
  try {
    let { student_id } = req.body;
    let [student, _] = await Candidate.findByStudentId(student_id);

    res.status(200).json({ student: student[0] });
  } catch (error) {
    next(error);
  }
};

exports.deleteStudentById = async (req, res, next) => {
  try {
    let id = req.params.id;

    let student = await Candidate.DeletebyId(id);

    res.status(200).json({ message: "Student deleted" });
  } catch (error) {
    next(error);
  }
};

exports.test = async (req, res, next) => {
  try {

    if (req.file) {
      var baseUrl = "http://localhost:3000/uploads/" + req.file.filename;
    } else {
      var baseUrl = "";
    }
    console.log(req.file.filename);

  } catch (error) {
    next(error);
  }
};

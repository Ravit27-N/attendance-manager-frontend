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
    let { name, gender } = req.body;
    let student = new Student(name, gender);

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

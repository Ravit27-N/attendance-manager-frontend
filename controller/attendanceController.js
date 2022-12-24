const Attendance = require("../models/Attendance");

exports.getAllstudent = async (req, res, next) => {
  try {
    const [attendances, _] = await Attendance.findAll();

    res.status(200).json({ count: attendances.length, attendances });
  } catch (error) {
    next(error);
  }
};

exports.registerattandacnce = async (req, res, next) => {
  try {
    let {student_id } = req.body;

    let attendance = new Attendance(student_id);
   
    attendance = await attendance.save();
    res.status(201).json({ message: "Attendance registered" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.getAttendanceById = async (req, res, next) => {
  try {
    let attendanceId = req.params.id;

    let [attendance, _] = await Student.findById(attendanceId);

    res.status(200).json({ attendance: attendance[0] });
  } catch (error) {
    next(error);
  }
};


exports.getLastFiveAttendances = async (req, res, next) => {
  try {

    let [attendance, _] = await Attendance.findlastfives();

    res.status(200).json({length:attendance.length, attendance: attendance});
  } catch (error) {
    next(error);
  }
};


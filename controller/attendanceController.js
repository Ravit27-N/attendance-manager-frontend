const Attendance = require("../models/Attendance");
const moment = require("moment");

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

//Top student join librery
exports.getTopAttendances = async (req, res, next) => {
  try {

    if(req.query.length==undefined){
      var length = 5;
    }else{
      var length = req.query.length;
    }

    let [attendance, _] = await Attendance.findmostattendanceregister(length);

    res.status(200).json({attendance: attendance});

  } catch (error) {
    next(error);
  }
};

exports.getstudentdatatoday = async (req, res, next) => {
  try {

   
    const from_date = moment().startOf('week').format("DD");
    const to_date = moment().endOf('week').format("DD");
    
    const monthdate = moment().format("MM");
    const todaydate = moment().format("DD");
    const yeardate = moment().format("YYYY");

    let [attendance, _] = await Attendance.countattendancetoday(todaydate);
    let today = attendance[0].total;
    
    [attendance, _] = await Attendance.countattendancethisweek(from_date,to_date);
    let week = attendance[0].total;

    [attendance, _] = await Attendance.countattendancethismonth(monthdate);
    let month = attendance[0].total;
    
    [attendance, _] = await Attendance.countattendanceyear(yeardate);
    let year = attendance[0].total;

    res.status(200).json({today: today,week: week,month: month,year: year});
  } catch (error) {
    next(error);
  }
};

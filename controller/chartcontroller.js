const Chart = require("../models/Chart");

exports.getdatatoday = async (req, res, next) => {
  try {
    const [data, _] = await Chart.count_year_dapartment_today();

    res.status(200).json({ message:"success", data });

  } catch (error) {
    next(error);
  }
};


exports.getAttendanceEachDepartment = async (req, res, next) => {
  let {start_date,end_date} = req.body;
  try {
    const [data, _] = await Chart.count_attendance_startdate_enddate_by_departmentyear(start_date,end_date);
    res.status(200).json({ message:"success", data });
  } catch (error) {
    next(error);
  }
};
exports.getAttendanceTotalDaily = async (req, res, next) => {
  let {start_date,end_date} = req.body;
  try {
    const [data, _] = await Chart.count_attendance_startdate_enddate_by_daily(start_date,end_date);
    res.status(200).json({ message:"success", data });
  } catch (error) {
    next(error);
  }
};


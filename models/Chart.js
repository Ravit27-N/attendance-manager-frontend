const db = require("../config/db");
const moment = require("moment");

class Chart {



  static count_year_dapartment_today() {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT stu.year_department as category, COUNT(year_department) AS count
                FROM attendances AS att
                JOIN students AS stu ON stu.student_id = att.student_id
                WHERE date(att.created) = '${convertTime}'
                GROUP BY stu.year_department;`;
    return db.execute(sql);

  }


  static count_attendance_startdate_enddate_by_departmentyear(startDate,endDate) {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT stu.year_department as category, COUNT(*) AS count
    FROM attendances as att JOIN students AS stu on att.student_id = stu.student_id
    where date(att.created) >= '${startDate}' AND date(att.created) <= '${endDate}'
	 GROUP BY stu.year_department;`;
    return db.execute(sql);
  }

  static count_attendance_startdate_enddate_by_daily(startDate,endDate) {
    var currentTime = new Date();
    const convertTime = moment(currentTime).format("YYYY-MM-DD");

    let sql = `SELECT date(att.created) as category, COUNT(*) AS count
    FROM attendances as att JOIN students AS stu on att.student_id = stu.student_id
    where date(att.created) >= '${startDate}' AND date(att.created) <= '${endDate}'
	 GROUP BY date(att.created);`;
    return db.execute(sql);

  }



}

module.exports = Chart;


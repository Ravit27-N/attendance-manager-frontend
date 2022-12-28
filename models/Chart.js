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

  static findByUsernameOrEmail(username,email) {

    let sql = `
          SELECT * FROM users where username='${username}' OR  email='${email}';
      `;
  
    return db.execute(sql);

  }



}

module.exports = Chart;


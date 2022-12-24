const db = require("../config/db");

class Attendance {

  constructor(student_id) {
    this.student_id = student_id;
  }

  save() {
    let sql = `
    INSERT INTO attendances(
      student_id
    )
    VALUES(
      '${this.student_id}'
    )`;
    return db.execute(sql);
  }
  edit(id) {
    let sql = `
      UPDATE attendances 
      set student_id='${this.student_id}'
      where students.id = '${id}';
      `;
    
    return db.execute(sql);
  }
  static findAll() {
    let sql = `SELECT att.*, 
    stu.name, 
    stu.option, 
    stu.gender, 
    stu.imageurl 
    FROM attendances as att LEFT JOIN students AS stu on att.student_id = stu.student_id;`;
    return db.execute(sql);
  }
  static findlastfives() { 
    let sql = `SELECT att.*, stu.name, stu.imageurl FROM 
    attendances as att LEFT JOIN students AS stu on att.student_id = stu.student_id
    order by id desc limit 5;
    `;
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM attendances WHERE id = ${id};`;
    return db.execute(sql);
  }

}

module.exports = Attendance;


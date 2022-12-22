const db = require("../config/db");

class Student {

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
    let sql = "SELECT * FROM students;";
    return db.execute(sql);
  }
  static findlastfives() { 
    let sql = "SELECT * FROM students;";
    return db.execute(sql);
  }
  static findById(id) {
    let sql = `SELECT * FROM students WHERE id = ${id};`;
    return db.execute(sql);
  }

}

module.exports = Student;


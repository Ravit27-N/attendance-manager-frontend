const db = require("../config/db");

class Student {
  constructor(name, gender) {
    this.name = name;
    this.gender = gender;
  }

  save() {
    let sql = `
    INSERT INTO student(
      name,
      gender
    )
    VALUES(
      '${this.name}',
      '${this.gender}'
    )
    `;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM student;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM student WHERE id = ${id};`;
    return db.execute(sql);
  }
}

module.exports = Student;


const db = require("../config/db");

class Student {

  constructor(student_id,name,gender,dob,province,year_department,department,option,imageurl) {
    this.student_id = student_id;
    this.name = name;
    this.gender = gender;
    this.dob= dob;
    this.province=province;
    this.year_department = year_department;
    this.department = department;
    this.option=option;
    this.imageurl=imageurl;
  }

  save() {
    let sql = `
    INSERT INTO students(
      student_id,
      name,
      gender,
      dob,
      province,
      year_department,
      department,
      option,
      imageurl
    )
    VALUES(
      '${this.student_id}',
      '${this.name}',
      '${this.gender}',
      '${this.dob}',
      '${this.province}',
      '${this.year_department}',
      '${this.department}',
      '${this.option}',
      '${this.imageurl}'
    )`;
    return db.execute(sql);
  }

  edit(id) {
    let sql="";
    if(this.imageurl!=''){
      sql = `
      UPDATE students 
      set student_id='${this.student_id}',
          name='${this.name}',
          gender='${this.gender}',
          dob='${this.dob}',
          province='${this.province}',
          year_department='${this.year_department}',
          department = '${this.department}',
          option='${this.option}',
          imageurl='${this.imageurl}'
      where students.id = '${id}'
      `;
    }else{
      sql = `
      UPDATE students 
      set student_id='${this.student_id}',
          name='${this.name}',
          gender='${this.gender}',
          dob='${this.dob}',
          province='${this.province}',
          year_department='${this.year_department}',
          department = '${this.department}',
          option='${this.option}'
      where students.id = '${id}'
      `;
    }
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM students;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM students WHERE id = ${id};`;
    return db.execute(sql);
  }

}

module.exports = Student;


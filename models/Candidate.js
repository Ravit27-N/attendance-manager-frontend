const db = require("../config/db");

class Candidate {

  constructor(student_id,name,gender,dob,usertype,year_department,department,option,imageurl) {
    this.student_id = student_id;
    this.name = name;
    this.gender = gender;
    this.dob= dob;
    this.usertype=usertype;
    this.year_department = year_department;
    this.department = department;
    this.option=option;
    this.imageurl=imageurl;
  }

  save() {
    let sql = `
    INSERT INTO candidates(
      student_id,
      name,
      gender,
      dob,
      usertype,
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
      '${this.usertype}',
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
      UPDATE candidates 
      set student_id='${this.student_id}',
          name='${this.name}',
          gender='${this.gender}',
          dob='${this.dob}',
          usertype='${this.usertype}',
          year_department='${this.year_department}',
          department = '${this.department}',
          option='${this.option}',
          imageurl='${this.imageurl}'
      where candidates.id = '${id}'
      `;
    }else{
      sql = `
      UPDATE candidates 
      set student_id='${this.student_id}',
          name='${this.name}',
          gender='${this.gender}',
          dob='${this.dob}',
          usertype='${this.usertype}',
          year_department='${this.year_department}',
          department = '${this.department}',
          option='${this.option}'
      where candidates.id = '${id}'
      `;
    }
    return db.execute(sql);
  }

  static DeletebyId(id) {
    let sql = `Delete FROM candidates where id=${id};`;
    return db.execute(sql);
  }

  static findAll() {
    let sql = "SELECT * FROM candidates;";
    return db.execute(sql);
  }

  static findById(id) {
    let sql = `SELECT * FROM candidates WHERE id = ${id};`;
    return db.execute(sql);
  }

  static findByStudentId(id) {
    let sql = `SELECT * FROM candidates WHERE student_id = '${id}';`;
    return db.execute(sql);
  }

}

module.exports = Candidate;


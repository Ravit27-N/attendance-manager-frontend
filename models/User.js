const db = require("../config/db");

class User {
  // constructor(email,password){
  //   this.email = email;
  //   this.password = password;
  // }

  constructor(username,email,password) {
    this.username = username;
    this.email = email;
    this.password = password;
  }

 
  save() {
    let sql = `
    INSERT INTO users(
      username,
      email,
      password
    )
    VALUES(
      '${this.username}',
      '${this.email}',
      '${this.password}'
    )`;
    return db.execute(sql);
  }

  editpassword(id) {

    let sql = `
      UPDATE users 
      set password='${this.password}'
      where students.id = '${id}'
      `;
  
    return db.execute(sql);

  }

  static findAll() {
    let sql = "SELECT * FROM users;";
    return db.execute(sql);
  }
  static findByUsernameOrEmail(username,email) {

    let sql = `
          SELECT * FROM users where username='${username}' OR  email='${email}';
      `;
  
    return db.execute(sql);

  }



}

module.exports = User;


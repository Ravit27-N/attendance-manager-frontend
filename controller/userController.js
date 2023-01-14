const User = require("../models/User");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

exports.getAlluser = async (req, res, next) => {
  try {
    const [user, _] = await User.findAll();
    res.status(200).json({ count: user.length, user });

  } catch (error) {
    next(error);
  }
};

exports.regitster = async (req, res, next) => {
  try {
    let { username, email, password } = req.body;

    if (!(username && email && password)) {
      await res.status(400).send("All input is required");
    }

    let [checkemail, _] = await User.findByUsernameOrEmail(username, email);



    if (checkemail.length != 0) {
      return res.status(409).send("Email or Username Already Exist. Please change email");
    }

    // //Encrypt user password
    let encryptedPassword = await bcrypt.hash(password, 10);
    let user = new User(username, email, encryptedPassword);

    user = await user.save();
    res.status(201).json({ message: "User created" });

  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.UpdateStudent = async (req, res, next) => {
  try {
    let { student_id, name, gender, dob, province, year_department, department, option } = req.body;
    var id = req.params.id;

    if (req.file) {
      var baseUrl = "http://localhost:3000/uploads/" + req.file.filename;
    } else {
      var baseUrl = "";
    }
    var imageurl = baseUrl;
    let student = new Student(student_id, name, gender, dob, province, year_department, department, option, imageurl);

    student = await student.edit(id);
    res.status(201).json({ message: "Student modified" });
  } catch (error) {
    console.log("Error 2");
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

   //if error login check database password set text not varchar
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    var username = email;
   
    let [user, _] = await User.findByUsernameOrEmail(username, email);
  
    const comparepassword = await bcrypt.compare(password,user[0].password);
    if (user.length > 0 && comparepassword) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        { expiresIn: "8h" }
      );
      // user
      res.status(200).json({ user: user, token: token });
    } else {
      res.status(400).send("Invalid Credentials");
    }

  } catch (error) {
    next(error);
  }
};



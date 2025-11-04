const AdminModel = require("../models/adminModel");
const UserPassword = require("../middlewares/randomPassword");
const emailSend = require("../middlewares/empMailSen");
const Employee = require("../models/empModel");


const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const Admin = await AdminModel.findOne({ email: email });

    if (!Admin) {
      return res.status(401).json({ msg: "Invalid email id" });
    }

    if (Admin.password !== password) {
      return res.status(401).json({ msg: "Invalid Password" });
    }

    res.status(200).json({ Admin: Admin, msg: "Successfully Logged In" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const userCreate = async (req, res) => {
  const { empname, empemail, designation } = req.body;

  try {
   
    const emppass = UserPassword.myPassword();
   
    emailSend.userMailsender(empname,empemail,emppass);

    const employee = await Employee.create({
      name:empname,
      email:empemail,
      designation:designation,
      password:emppass
    });

    res.status(200).json({ msg: "User created and email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
};

module.exports = { adminLogin, userCreate };

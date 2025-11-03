const AdminModel = require("../models/adminModel");
const UserPassword = require("../middlewares/randomPassword");
const nodemailer = require("nodemailer");

// ===================== ADMIN LOGIN =====================
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

// ===================== USER CREATE =====================
const userCreate = async (req, res) => {
  const { empname, empemail, designation } = req.body;

  try {
    // 1️⃣ Generate a random password
    const randomPass = UserPassword.myPassword();
    console.log("Generated Password:", randomPass);

    // 2️⃣ Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "amantiwari9589@gmail.com", // replace with your Gmail
        pass: "yrbwctlxtinrtzkm",    // use App Password, not your Gmail password
      },
    });

    // 3️⃣ Define mail content
    const mailOptions = {
      from: "amantiwari9589@gmail.com",
      to: empemail,
      subject: "Welcome to the Company!",
      html: `
        <h3>Hello ${empname},</h3>
        <p>You have been added as a <b>${designation}</b> in our system.</p>
        <p>Your login credentials are:</p>
        <ul>
          <li><b>Email:</b> ${empemail}</li>
          <li><b>Password:</b> ${randomPass}</li>
        </ul>
        <p>Please change your password after first login.</p>
        <br/>
        <p>Best regards,<br/>Admin Team</p>
      `,
    };

    // 4️⃣ Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", empemail);

    // 5️⃣ Send response
    res.status(200).json({ msg: "User created and email sent successfully" });

  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ error: "Failed to send email", details: error.message });
  }
};

module.exports = { adminLogin, userCreate };

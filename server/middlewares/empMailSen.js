const nodemailer = require("nodemailer");

const userMailsender = (uname, uemail, upass) => {
  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "amantiwari9589@gmail.com", // replace with your Gmail
      pass: "yrbwctlxtinrtzkm", // use App Password, not your Gmail password
    },
  });

  var mailOptions = {
      from: 'amantiwari9589@gmail.com',
      to: uemail,
      subject: 'Sending Email by Admin using Node.js Task Management System ',
      text:`Dear :  ${uname}\n Your Password :  ${upass}\n You can Login With Email and this Password`
    };

     transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email Succ sent: ' + info.response);
        res.send(info.response);
      }
    });
};


module.exports= {
    userMailsender
}
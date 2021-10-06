const nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    //host:'gmail',
  
    auth: {
      user: "charymani1@gmail.com",
      pass: "mani@akp@1995"
    }
});

var mailOptions = {
  from: 'charymani1@gmail.com',
  to: 'akkenapallimanikanta@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'Hi this is manikanta Welcome to My email function'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
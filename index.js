const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const nodeMailer = require('nodemailer');

const app = express();

app.use(cors({origin: "*"}));
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port " + port)
})


app.get('/hi',(req,res) => {
  res.send("working");
})

app.post('/sendmail', (req,res) => {
  let user = req.body;
  sendmail(user, info => {
    console.log('mail has been send');
    res.send(info);
  });
});

app.post('/sendConfirmMail', (req,res) => {
  let user = req.body;
  sendConfirmMail(user, info => {
    console.log('mail has been send');
    res.send(info);
  });
});

const transporter = nodeMailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth:{
    user: process.env.OWNER_EMAIL,
    pass: process.env.PASSWORD
  }
})

async function sendmail(user, callback) {

  let mailOptions = {
    from: 'patelyash99138@gmail.com',
    to: 'ypateladditional@gmail.com',
    subject: "Message from portfolio visitor...",
    html: `<h1>Hi Yash</h1><br>
    <h4>${user.name} visited portfolio and left message and email.</h4><br>
    <p>Email: ${user.email}</p>
    <p>Message: ${user.message}</p><br>
    <br>
    <p>Have a great day</p>`
  };

  let info = await transporter.sendMail(mailOptions);
  callback(info);
}

async function sendConfirmMail(user, callback) {

  let mailOptions_fromOwner = {
    from: 'patelyash99138@gmail.com',
    to: user.email,
    subject: "Message from Yash Patel...",
    html: `<h1>Hi ${user.name}</h1><br>
    <h4>It's my pleasure that you looked into my portfolio and left good message for me...</h4><br>
    <p>Thank you</p>
    <p>Yash Patel</p><br>`
  };

  let info = await transporter.sendMail(mailOptions_fromOwner);
  callback(info);
}


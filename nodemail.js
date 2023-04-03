
const nodemailer = require("nodemailer");
const { config } = require("./config/config");

console.log(config.mailerUser);
console.log(config.mailerPass);

// async..await is not allowed in global scope, must use a wrapper
async function sendMail() {

  // create reusable transporter object using the default SMTP transport

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
        user: config.mailerUser,
        pass: config.mailerPass
    }
});

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: config.mailerUser, // sender address
    to: "jaasnavas0811@gmail.com", // list of receivers
    subject: "Este es un nuevo correo", // Subject line
    text: "Hola Santi", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

sendMail()

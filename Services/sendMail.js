const nodemailer = require("nodemailer");
const emailer = function emailer(to, text) {
  //function to send email
  const nodemailer = require("nodemailer");
async function main() {
  let testAccount = await nodemailer.createTestAccount();
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, 
        auth: {
      user:"kadin.hickle27@ethereal.email", 
      pass:"rdyp9CxgVW3TnZwHE3", 
    },
  });
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', 
    to: to, 
    subject: "Hello ✔", 
    text: "Your OTP is"+text 
  });
  console.log("sent");
}

main().catch(console.error);}
module.exports = emailer;

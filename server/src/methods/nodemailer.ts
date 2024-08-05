import nodemailer from "nodemailer";

class Mailer {
  static nodemail1 = "socialappnode@hotmail.com";
  static nodemail2 = "socialappnode2@hotmail.com";

  static PASS = "Socialappbg7";
  static MAIL = Mailer.nodemail2;

  static transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
      user: Mailer.MAIL,
      pass: Mailer.PASS,
    },
  });
}

export default Mailer;

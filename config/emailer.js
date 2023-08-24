const nodemailer = require("nodemailer");
const nodemailerSendgrid = require("nodemailer-sendgrid");
const createTrans = () => {
  /*  const transport = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "c52b45a9750a4f",
      pass: "99310e773dbf9f",
    },
  }); */
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "77fer1997@gmail.com",
      pass: "esekyiultskjrmgp",
    },
  });
  return transport;
};
const sendMail = async (email) => {
  const transporter = createTrans();
  const info = await transporter.sendMail({
    from: "77fer1997@gmail.com",
    to: `${email}`,
    subject: `Bienvenido ${email}`,
    html: "<h1>Hello world?</h1>",
  });
  console.log("Message sent: %s", info.messageId);
};

exports.sendMail = (email) => sendMail(email);

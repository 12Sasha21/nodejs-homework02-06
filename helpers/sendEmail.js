const sgMail = require("@sendgrid/mail");
require("dotenv").config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: "locshuc1311@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error();
  }
};

module.exports = sendEmail;

// const email = {
//   to: "lok1311@ukr.net",
//   from: "locshuc1311@gmail.com",
//   subject: "Новий лист",
//   html: "<p>Зміст листа</p",
// };

// sgMail
//   .send(email)
//   .then(() => console.log("Success send"))
//   .catch((error) => console.log(error.message));

const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);

const { createError, sendEmail } = require(`${basedir}/helpers`);

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { error } = schemas.email.validate({ email });
  if (error) {
    throw createError(400, "missing required field email");
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw createError(404);
  }
  if (user.verify) {
    throw createError(400, "Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Підтвердження реєстрації на сайті",
    html: `<a target="_blank" href="http://localhost:3000/api/auth/verify/${user.verificationToken}">Натисніть для підтвердження реєстрації</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
  });
};

module.exports = resendVerifyEmail;

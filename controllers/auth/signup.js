const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");

const { basedir } = global;

const { User, schemas } = require(`${basedir}/models/user`);
const { createError } = require(`${basedir}/helpers`);

const signup = async (req, res) => {
  const { error } = schemas.signup.validate(req.body); // перевіряємо тіло запиту яке прислали
  if (error) {
    // якщо з тілом щось нетак
    throw createError(400, error.message); // 400 Bad Request
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email }); // перевыряэмо чи є таки користувач
  if (user) {
    // якщо користувач є
    throw createError(409, "Email in use"); // 409 - конфлікт
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email); // місце для тимчасового аватару
  const result = await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
  });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;

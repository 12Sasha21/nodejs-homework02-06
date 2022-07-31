const bcrypt = require("bcryptjs");

const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");

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
  const result = await User.create({ ...req.body, password: hashPassword });
  res.status(201).json({
    user: {
      email: result.email,
      subscription: result.subscription,
    },
  });
};

module.exports = signup;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { User, schemas } = require("../../models/user");
const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res) => {
  const { error } = schemas.login.validate(req.body); // перевіряємо тіло запиту яке прислали
  if (error) {
    // якщо з тілом щось нетак
    throw createError(400, error.message); // 400 Bad Request
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    // якщо користувач є
    throw createError(401, "Email or password is wrong");
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
    throw createError(401, "Email or password is wrong");
  }

  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });
  const subscription = user.subscription;
  await User.findByIdAndUpdate(user._id, { token });
  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

module.exports = login;

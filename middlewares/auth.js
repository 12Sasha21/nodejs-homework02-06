const jwt = require("jsonwebtoken");

const { User } = require("../models/user");

const { createError } = require("../helpers");

const { SECRET_KEY } = process.env;

const auth = async (req, _, next) => {
  const { authorization = "" } = req.headers; // get from headers authorization-header
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    // check if first word in header is "Bearer"
    next(createError(401, "Not authorized")); // if not - return 401
  }
  try {
    const { id } = jwt.verify(token, SECRET_KEY); // check if second word is our token
    const user = await User.findById(id); // find in database the user with the "id" coded in the token
    if (!user || !user.token) {
      next(createError(401, "Not authorized"));
    }
    req.user = user;
    next();
  } catch (error) {
    next(createError(401, "Not authorized"));
  }
};

module.exports = auth;

const { createError } = require("../../helpers");
const { User, schemas } = require("../../models/user");

const updateSubscription = async (req, res) => {
  // const { email, subscription } = req.user;
  const { error } = schemas.subscription.validate(req.body);
  if (error) {
    throw createError(400, "missing field subscription");
  }
  const { id } = req.user;
  const result = await User.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateSubscription;

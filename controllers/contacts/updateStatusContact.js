const { createError } = require("../../helpers");
const { Contact, schemas } = require("../../models/contact");

const updateStatusContact = async (req, res) => {
  const { error } = schemas.favoriteJoiSchema.validate(req.body);
  if (error) {
    throw createError(400, "missing field favorite");
  }
  const { contactId } = req.params;
  const result = await Contact.findByIdAndUpdate(contactId, req.body, {
    new: true,
  });
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = updateStatusContact;
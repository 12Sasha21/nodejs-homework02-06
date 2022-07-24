const { createError } = require("../../helpers");
const { Contact } = require("../../models/contact");

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await Contact.findById(contactId);
  if (!result) {
    throw createError(404);
  }
  res.json(result);
};

module.exports = getContactById;

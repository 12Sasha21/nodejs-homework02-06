const { Contact, schemas } = require("../../models/contact");
const { createError } = require("../../helpers");

const addContact = async (req, res, next) => {
  try {
    const { error } = schemas.joiSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = addContact;

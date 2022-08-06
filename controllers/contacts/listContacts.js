const { Contact } = require("../../models/contact");

const listContacts = async (req, res) => {
  const { id: owner } = req.user; // той хто хоче всі книги
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  let query;

  favorite ? (query = { owner, favorite }) : (query = { owner });

  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit: Number(limit),
  }).populate("owner", "email subscription");

  res.json(result);
};

module.exports = listContacts;

const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactsId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactsId);
  return !result ? "contact not found" : result;
};

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();
//   const idx = contacts.findIndex((item) => item.id === contactId);
//   if (idx === -1) {
//     return null;
//   }
//   const [removeContact] = contacts.splice(idx, 1);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return removeContact;
// };

// const addContact = async (name, email, phone) => {
//   const contacts = await listContacts();
//   const id = `${Number(contacts[contacts.length - 1].id) + 1}`;
//   const newContact = {
//     id: id,
//     name,
//     email,
//     phone,
//   };
//   contacts.push(newContact);
//   await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
//   return newContact;
// };

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {};

module.exports = {
  listContacts,
  getContactById,
  // removeContact,
  // addContact,
  // updateContact,
};

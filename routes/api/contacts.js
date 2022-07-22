const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");

const { createError } = require("../../helpers");

const router = express.Router(); // створення сторіни записної книжки

const contactAddSchema = Joi.object({
  // перевіряємо чи тіло запиту відповідає потрібній схемі
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params; // змінні зберігаються в req.params
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw createError(404); // throw - перестрибуємо вниз...
    }
    res.json(result);
  } catch (error) {
    // ...сюди
    next(error); // некст переносить помилку в апп
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw createError(404);
    }
    // res.status(204).json({
    //   message: "contact delete",
    // }); якщо вказати 204 статус то тіло не відсиліється. Треба res.status(204).send().
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body); // перевіряємо тіло
    if (error) {
      throw createError(400, "missing fields");
    }
    const { contactId } = req.params; // находимо ід
    const result = await contacts.updateContact(contactId, req.body); // оновлюємо за ід
    if (!result) {
      // якщо ід немає повертаємо помилку
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

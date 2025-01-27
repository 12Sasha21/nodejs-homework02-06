const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();

global.basedir = __dirname;

const authRouter = require("./routes/api/auth");
const contactsRouter = require("./routes/api/contacts"); // імпорт групи маршрутів

const app = express(); // створення веб-сервера

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // якщо режим розробника тоді виводити повну інфор.

app.use(logger(formatsLogger)); // мідлвар для виводу данних в консоль
app.use(cors());
app.use(express.json()); // якщо content-type це json, тоді парсить його та зберігаємо в req.body
app.use(express.static("public")); // якщо приходить запит за статичним файлом, шукати в public

app.use("/api/users", authRouter);
app.use("/api/contacts", contactsRouter); // створення групи маршрутів. Будь який запит, що починається з /api/contacts, оброблюється - contactsRouter

app.use((req, res) => {
  res.status(404).json({ message: "Not found" }); // якщо немає адреси
});

app.use((err, req, res, next) => {
  // піймана помилка із роута - четвертий параметр(err)
  const { status = 500, message = "Server error" } = err; // якщо немає статусу тоді 500
  res.status(status).json({ message }); // якщо немає меседжу тоді "Server error"
});

module.exports = app;

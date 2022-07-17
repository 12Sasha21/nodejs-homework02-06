const express = require("express");
const cors = require("cors");
const logger = require("morgan");

const contactsRouter = require("./routes/api/contacts"); // імпорт групи маршрутів

const app = express(); // створення веб-сервера

const formatsLogger = app.get("env") === "development" ? "dev" : "short"; // якщо режим розробника тоді виводити повну інфор.

app.use(logger(formatsLogger)); // мідлвар для виводу данних
app.use(cors());
// app.use(express.json());

app.use("/api/contacts", contactsRouter); // створення групи маршрутів. Будь який запит, що починається з /api/contacts, оброблюється - contactsRouterю

app.use((req, res) => {
  res.status(404).json({ message: "Not found" }); // якщо немає адреси
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

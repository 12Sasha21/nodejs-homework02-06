const express = require("express");

const { auth } = require("../../middlewares");

const ctrl = require("../../controllers/auth");

const { ctrlWrapper } = require("../../helpers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup)); // signup

router.post("/login", ctrlWrapper(ctrl.login)); // signin

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));

module.exports = router;

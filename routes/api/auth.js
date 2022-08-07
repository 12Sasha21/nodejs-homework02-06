const express = require("express");

const { basedir } = global;

const { auth, upload } = require(`${basedir}/middlewares`);

const ctrl = require(`${basedir}/controllers/auth`);

const { ctrlWrapper } = require(`${basedir}/helpers`);

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.signup)); // signup

router.post("/login", ctrlWrapper(ctrl.login)); // signin

router.get("/logout", auth, ctrlWrapper(ctrl.logout));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.patch("/", auth, ctrlWrapper(ctrl.updateSubscription));

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  ctrlWrapper(ctrl.setAvatar)
);

module.exports = router;

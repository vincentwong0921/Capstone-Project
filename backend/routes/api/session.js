const express = require("express");
const { Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { setTokenCookie } = require("../../utils/auth");
const { User } = require("../../db/models");

const router = express.Router();

router.get("/", (req, res) => {
  const { user } = req;
  if (user) {
    const safeUser = {
      id: user.id,
      email: user.email,
      first_name: user.first_name,
      role: user.role
    };
    return res.json({ user: safeUser });
  } else return res.json({ user: null });
});

/* Login */
router.post("/", async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.unscoped().findOne({
    where: { email },
  });

  if (!user || !bcrypt.compareSync(password, user.hashedPassword.toString())) {
    const err = new Error("Login failed");
    err.status = 401;
    err.title = "Login failed";
    err.errors = { credential: "The provided credentials were invalid." };
    return next(err);
  }

  const safeUser = {
    id: user.id,
    email: user.email,
    first_name: user.first_name,
    role: user.role
  };

  await setTokenCookie(res, safeUser);

  return res.json({
    user: safeUser,
  });
});

/* Log Out */
router.delete("/", (_req, res) => {
  res.clearCookie("token");
  return res.json({ message: "success" });
});

module.exports = router;

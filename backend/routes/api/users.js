const express = require("express");
const bcrypt = require("bcryptjs");
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User } = require("../../db/models");
const { handleValidationErrors } = require("../../utils/validation");
const { check } = require("express-validator");

const router = express.Router();

const validateSignup = [
  check("first_name")
    .exists({ checkFalsy: true })
    .withMessage("First Name is required")
    .custom((value) => {
      if(value.trim().length === 0){
        throw new Error('Invalid First Name')
      }
      return true
    }),
  check("last_name")
    .exists({ checkFalsy: true })
    .withMessage("Last Name is required")
    .custom((value) => {
      if(value.trim().length === 0){
        throw new Error('Invalid First Name')
      }
      return true
    }),
  check("phone")
    .exists({ checkFalsy: true })
    .isLength({ min: 10, max: 10 })
    .withMessage("Phone Number is required and must be in 10 digits"),
  check("email")
    .exists({ checkFalsy: true })
    .isEmail()
    .withMessage("Invalid email"),
  check("password")
    .exists({ checkFalsy: true })
    .isLength({ min: 6 })
    .withMessage("Password must be 6 characters or more."),
  handleValidationErrors,
];

//Sign up Route
router.post("/", validateSignup, async (req, res) => {
  const { first_name, last_name, phone, email, password } = req.body;
  const hashedPassword = bcrypt.hashSync(password);

  const existingEmail = await User.findOne({ where: { email } });

  if (existingEmail) {
    return res.status(500).json({
      message: "User already exists",
      errors: { email: "User with that email already exists" },
    });
  } else {
    const user = await User.create({
        first_name,
        last_name,
        phone,
        email,
        hashedPassword,
        role: 'Customer'
    })

    const safeUser = {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    phone: user.phone,
    email: user.email,
    };

    await setTokenCookie(res, safeUser);

    return res.json({ user: safeUser });
  }
});

module.exports = router;

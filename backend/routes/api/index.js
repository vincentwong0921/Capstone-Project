const router = require("express").Router();
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const inventoryRouter = require("./inventories.js");
const reviewRouter = require("./reviews.js")
const { restoreUser } = require("../../utils/auth.js");

router.use(restoreUser);

router.use("/session", sessionRouter);
router.use("/users", usersRouter);
router.use("/inventories", inventoryRouter);
router.use("/reviews", reviewRouter);

module.exports = router;

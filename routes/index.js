const express = require("express");
const router = express.Router();

const home = require("./modules/home");
const records = require("./modules/records");
const users = require("./modules/users");
const auth = require("./modules/auth");

const { authenticator } = require("../middleware/auth");

router.use("/records", authenticator, records);
router.use("/users", users);
router.use("/auth", auth);
router.use("/", authenticator, home);

module.exports = router;

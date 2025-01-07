const express = require("express");
const router = express.Router();
const { registration, login } = require("../controllers/authController");
// const authorize = require("../middleware/authMiddleware");

router.post("/register", registration);

router.post("/login", login);

module.exports = router;

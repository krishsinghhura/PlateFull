const express = require("express");
const router = express.Router();
const {
  createMenuItem,
  getRestaurantMenuItems,
} = require("../controllers/menuItemController");

router.post("/menu-items", createMenuItem);

module.exports = router;

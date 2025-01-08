const express = require("express");
const router = express.Router();
const {
  createMenuItem,
  getRestaurantMenuItems,
} = require("../controllers/menuItemController");

router.post("/menu-items", createMenuItem);

router.get("/restaurant-profile/:id/menu-items", getRestaurantMenuItems);

module.exports = router;

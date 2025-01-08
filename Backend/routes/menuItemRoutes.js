const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig"); // Multer middleware
const {
  createMenuItem,
  getRestaurantMenuItems,
} = require("../controllers/menuItemController");

router.post("/menu-items", upload.single("image"), createMenuItem);

router.get("/restaurant-profile/:id/menu-items", getRestaurantMenuItems);

module.exports = router;

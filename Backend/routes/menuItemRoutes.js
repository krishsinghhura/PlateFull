const express = require("express");
const router = express.Router();
const upload = require("../config/multerConfig"); // Multer middleware
const {
  createMenuItem,
  getRestaurantMenuItems,
  editMenu,
  deletMenu,
} = require("../controllers/menuItemController");
const authorize = require("../middleware/middleware");

router.post("/menu-items", upload.single("image"), authorize, createMenuItem);

router.get(
  "/restaurant-profile/:id/menu-items",
  authorize,
  getRestaurantMenuItems
);

router.put("/menu-items/:id", authorize, editMenu);

router.delete("/menu-items/:id", authorize, deletMenu);

module.exports = router;

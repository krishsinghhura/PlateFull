const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getUserDetails,
  editRestaurant,
  deleteRestaurant,
} = require("../controllers/restaurantController");
const authorize = require("../middleware/middleware");

router.post("/restaurant-profile", authorize, createRestaurant);

router.get("/users/:id", getUserDetails);

router.put("/restaurants/:id", authorize, editRestaurant);

router.delete("/restaurants/:id", authorize, deleteRestaurant);

module.exports = router;

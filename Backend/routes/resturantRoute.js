const express = require("express");
const router = express.Router();
const {
  createRestaurant,
  getUserDetails,
} = require("../controllers/restaurantController");

router.post("/restaurant-profile", createRestaurant);

router.get("/users/:id", getUserDetails);

module.exports = router;

const mongoose = require("mongoose");

const RestaurantProfileSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  contact: { type: String, required: true },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user who owns this restaurant
});

module.exports = mongoose.model("RestaurantProfile", RestaurantProfileSchema);

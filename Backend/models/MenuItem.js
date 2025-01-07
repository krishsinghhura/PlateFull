const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: { type: String },
  restaurant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "RestaurantProfile",
    required: true,
  }, // Reference to the restaurant this menu item belongs to
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }, // Reference to the user who created this menu item
});

module.exports = mongoose.model("MenuItem", MenuItemSchema);

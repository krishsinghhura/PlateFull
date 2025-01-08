const mongoose = require("mongoose");

const MenuItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  image: {
    type: String,
    default:
      "https://imgs.search.brave.com/6s7IhYd4NcyR1yJpGR0n19jQA-WCo9099vxMCqfv4cY/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMuZnJlZWltYWdl/cy5jb20vaW1hZ2Vz/L2dyaWRzL2JmZC9m/b29kLWRyaW5rLTEt/MS0xMzI0NjY3Lmpw/Zw",
  },
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

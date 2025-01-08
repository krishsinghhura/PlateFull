const User = require("../models/userModel");
const MenuItem = require("../models/MenuItem");
const multer = require("multer");
const uploadImageToSupabase = require("../utils/uploadImageToSupabase");

// POST /api/menu-items
const createMenuItem = async (req, res) => {
  try {
    const { userId, title, description, price, category, image } = req.body;
    const user = await User.findById(userId).populate("restaurant");
    if (!user) return res.status(404).json({ message: "User not found" });

    const restaurant = user.restaurant;
    if (!restaurant)
      return res
        .status(400)
        .json({ message: "No restaurant found for this user" });

    let imageUrl = null;
    if (req.file) {
      imageUrl = await uploadImageToSupabase(
        req.file.buffer,
        req.file.originalname
      );
    }
    const menuItem = new MenuItem({
      title,
      description,
      price,
      category,
      image: imageUrl,
      restaurant: restaurant._id,
      owner: userId,
    });

    await menuItem.save();

    user.menuItems.push(menuItem._id);
    await user.save();

    res.status(201).json(menuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/restaurant-profile/:id/menu-items
const getRestaurantMenuItems = async (req, res) => {
  try {
    const menuItems = await MenuItem.find({ restaurant: req.params.id });
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMenuItem,
  getRestaurantMenuItems,
};

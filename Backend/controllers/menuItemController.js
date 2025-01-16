const User = require("../models/userModel");
const MenuItem = require("../models/MenuItem");
const mongoose = require("mongoose");
const uploadImageToSupabase = require("../utils/uploadImageToSupabase");

// POST /api/menu-items
const createMenuItem = async (req, res) => {
  try {
    const { userid, title, description, price, category } = req.body;
    const user = await User.findById(userid).populate("restaurant");
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
      owner: userid,
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

// PUT /api/v2/menu-items/:id
const editMenu = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, price, category, image } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Menu Item ID" });
    }

    // Find and update the menu item
    const updatedMenuItem = await MenuItem.findByIdAndUpdate(
      id,
      { title, description, price, category, image },
      { new: true } // Return the updated document
    );

    if (!updatedMenuItem) {
      return res.status(404).json({ message: "Menu Item not found" });
    }

    res.status(200).json(updatedMenuItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/v2/menu-items/:id
const deletMenu = async (req, res) => {
  try {
    const menuItem = await MenuItem.findByIdAndDelete(req.params.id);

    if (!menuItem) {
      return res.status(404).json({ message: "Menu item not found" });
    }

    res.status(200).json({ message: "Menu item deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getMenuItemsByOwner = async (req, res) => {
  try {
    const { ownerId } = req.params; // Extract ownerId from URL parameters

    // Fetch all menu items where the owner matches the provided ID
    const menuItems = await MenuItem.find({ owner: ownerId }).populate("owner");

    if (menuItems.length === 0) {
      return res
        .status(404)
        .json({ message: "No menu items found for this owner." });
    }

    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  createMenuItem,
  getRestaurantMenuItems,
  editMenu,
  deletMenu,
  getMenuItemsByOwner,
};

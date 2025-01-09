const User = require("../models/userModel");
const RestaurantProfile = require("../models/RestaurantProfile");
const mongoose = require("mongoose");

// POST /api/restaurant-profile
const createRestaurant = async (req, res) => {
  try {
    const { userId, name, address, contact } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const restaurant = new RestaurantProfile({
      name,
      address,
      contact,
      owner: userId,
    });

    await restaurant.save();

    user.restaurant = restaurant._id;
    await user.save();

    res.status(201).json(restaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /api/users/:id
const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("restaurant")
      .populate("menuItems");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PUT /api/v2/restaurants/:id
const editRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, contact } = req.body;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Restaurant ID" });
    }

    // Find and update the restaurant
    const updatedRestaurant = await RestaurantProfile.findByIdAndUpdate(
      id,
      { name, address, contact },
      { new: true } // Return the updated document
    );

    if (!updatedRestaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json(updatedRestaurant);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// DELETE /api/v2/restaurants/:id
const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await RestaurantProfile.findByIdAndDelete(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    res.status(200).json({ message: "Restaurant deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createRestaurant,
  getUserDetails,
  editRestaurant,
  deleteRestaurant,
};

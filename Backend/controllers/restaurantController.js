const User = require("../models/userModel");
const RestaurantProfile = require("../models/RestaurantProfile");

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

module.exports = {
  createRestaurant,
  getUserDetails,
};

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const restaurantRoutes = require("./routes/resturantRoute");

const app = express();

dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("hey");
});

app.use("/api/v2", userRoutes);

//protected Routes
app.use("/api/v2", menuItemRoutes);
app.use("/api/v2", restaurantRoutes);

module.exports = app;
